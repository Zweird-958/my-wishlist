import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { asc, eq, wishes as wishesTable } from "@my-wishlist/db"
import { addWishSchema, editWishSchema } from "@my-wishlist/schemas"

import fetchWish from "../handlers/fetch-wish"
import auth from "../middlewares/auth"
import deleteFile from "../utils/delete-file"
import formatWish from "../utils/format-wish"

const app = new Hono()
  .get("/", auth, async ({ var: { db, user, send, lang } }) => {
    const wishes = await db.query.wishes.findMany({
      where: eq(wishesTable.userId, user.id),
      orderBy: [asc(wishesTable.createdAt)],
    })

    const wishesFormatted = wishes.map((wish) => formatWish(wish, lang))

    return send(wishesFormatted)
  })
  .delete(
    "/:wishId",
    auth,
    ...fetchWish,
    async ({ var: { send, wish, db, lang } }) => {
      await db.delete(wishesTable).where(eq(wishesTable.id, wish.id))

      if (wish.image) {
        await deleteFile(wish.image)
      }

      return send(formatWish(wish, lang))
    },
  )
  .get("/:wishId", auth, ...fetchWish, ({ var: { send, wish, lang } }) =>
    send(formatWish(wish, lang)),
  )
  .post(
    "/",
    auth,
    zValidator("json", addWishSchema),
    async ({ req, var: { user, db, send, lang } }) => {
      const { name, price, link, currency, isPrivate, image } =
        req.valid("json")

      const [wish] = await db
        .insert(wishesTable)
        .values({
          name,
          price: Number(price),
          link,
          currency,
          userId: user.id,
          isPrivate,
          image,
        })
        .returning()

      return send(formatWish(wish!, lang))
    },
  )
  .patch(
    "/:wishId",
    auth,
    ...fetchWish,
    zValidator("json", editWishSchema),
    async ({ req, var: { wish, db, send, lang } }) => {
      const { name, price, link, currency, isPrivate, image } =
        req.valid("json")

      const [updatedWish] = await db
        .update(wishesTable)
        .set({
          name: name ?? wish.name,
          price: price ?? wish.price,
          link,
          currency: currency ?? wish.currency,
          isPrivate:
            typeof isPrivate === "boolean" ? isPrivate : wish.isPrivate,
          image: image ?? wish.image,
        })
        .where(eq(wishesTable.id, wish.id))
        .returning()

      return send(formatWish(updatedWish!, lang))
    },
  )

export default app
