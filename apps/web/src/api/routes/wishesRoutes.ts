import { Hono } from "hono"

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

export default app
