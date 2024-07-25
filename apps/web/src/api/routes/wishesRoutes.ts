import { Hono } from "hono"

import fetchWish from "@/api/handlers/fetchWish"
import auth from "@/api/middlewares/auth"
import formatWish from "@/api/utils/formatWish"

const app = new Hono()

app.get("/", auth, async ({ var: { db, user, fail, send } }) => {
  try {
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return fail(500)
  }
})

app.delete(
  "/:wishId",
  auth,
  ...fetchWish,
  async ({ var: { send, fail, wish, db } }) => {
    try {
      await db.wish.delete({
        where: {
          id: wish.id,
        },
      })

      return send(formatWish(wish))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)

      return fail(500)
    }
  },
)

export default app
