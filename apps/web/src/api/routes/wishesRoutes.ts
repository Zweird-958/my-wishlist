import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { addWishSchema, editWishSchema } from "@my-wishlist/schemas"

import fetchWish from "@/api/handlers/fetchWish"
import uploadFile from "@/api/handlers/uploadFile"
import auth from "@/api/middlewares/auth"
import deleteFile from "@/api/utils/deleteFile"
import formatWish from "@/api/utils/formatWish"

const app = new Hono()

app.get("/", auth, async ({ var: { db, user, send, lang } }) => {
  const wishes = await db.wish.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  const wishesFormatted = wishes.map((wish) => formatWish(wish, lang))

  return send(wishesFormatted)
})

app.delete(
  "/:wishId",
  auth,
  ...fetchWish,
  async ({ var: { send, wish, db, lang } }) => {
    await db.wish.delete({
      where: {
        id: wish.id,
      },
    })

    if (wish.image) {
      await deleteFile(wish.image)
    }

    return send(formatWish(wish, lang))
  },
)

app.get("/:wishId", auth, ...fetchWish, ({ var: { send, wish, lang } }) =>
  send(formatWish(wish, lang)),
)

app.post(
  "/",
  auth,
  ...uploadFile,
  zValidator("form", addWishSchema),
  async ({ req, var: { user, db, send, image, lang } }) => {
    const { name, price, url, currency, isPrivate } = req.valid("form")

    const wish = await db.wish.create({
      data: {
        name,
        image,
        price: Number(price),
        link: url,
        currency,
        userId: user.id,
        isPrivate,
      },
    })

    return send(formatWish(wish, lang))
  },
)

app.patch(
  "/:wishId",
  auth,
  ...fetchWish,
  ...uploadFile,
  zValidator("form", editWishSchema),
  async ({ req, var: { wish, db, send, image, lang } }) => {
    const { name, price, url, currency, isPrivate, purchased } =
      req.valid("form")

    const updatedWish = await db.wish.update({
      where: {
        id: wish.id,
      },
      data: {
        name: name ?? wish.name,
        image: image || wish.image,
        price: price ?? wish.price,
        link: url,
        currency: currency ?? wish.currency,
        isPrivate: typeof isPrivate === "boolean" ? isPrivate : wish.isPrivate,
        purchased: typeof purchased === "boolean" ? purchased : wish.purchased,
      },
    })

    return send(formatWish(updatedWish, lang))
  },
)

export default app
