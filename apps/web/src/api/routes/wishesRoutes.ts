import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { addWishSchema } from "@my-wishlist/schemas"

import fetchWish from "@/api/handlers/fetchWish"
import uploadFile from "@/api/handlers/uploadFile"
import auth from "@/api/middlewares/auth"
import deleteFile from "@/api/utils/deleteFile"
import formatWish from "@/api/utils/formatWish"

const app = new Hono()

app.get("/", auth, async ({ var: { db, user, send } }) => {
  const wishes = await db.wish.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  const wishesFormatted = wishes.map((wish) => formatWish(wish))

  return send(wishesFormatted)
})

app.delete(
  "/:wishId",
  auth,
  ...fetchWish,
  async ({ var: { send, wish, db } }) => {
    await db.wish.delete({
      where: {
        id: wish.id,
      },
    })

    if (wish.image) {
      await deleteFile(wish.image)
    }

    return send(formatWish(wish))
  },
)

app.get("/:wishId", auth, ...fetchWish, ({ var: { send, wish } }) =>
  send(formatWish(wish)),
)

app.post(
  "/",
  auth,
  ...uploadFile,
  zValidator("form", addWishSchema),
  async ({ req, var: { user, db, send, image } }) => {
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

    return send(formatWish(wish))
  },
)

export default app
