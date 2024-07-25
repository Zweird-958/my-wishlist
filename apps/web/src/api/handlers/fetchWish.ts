import { zValidator } from "@hono/zod-validator"
import type { User, Wish } from "@prisma/client"
import { createFactory } from "hono/factory"
import { z } from "zod"

type Env = {
  Variables: {
    wish: Wish
    user?: User
  }
}

const schema = z.object({
  wishId: z.string(),
})

const factory = createFactory<Env>()

const fetchWish = factory.createHandlers(
  zValidator("param", schema),
  async ({ req, set, var: { db, fail, user } }, next) => {
    if (!user) {
      return fail(401)
    }

    const { wishId } = req.valid("param")

    try {
      const wish = await db.wish.findUnique({
        where: {
          id: parseInt(wishId, 10),
        },
      })

      if (!wish || wish.userId !== user.id) {
        return fail("wishNotFound")
      }

      set("wish", wish)
      await next()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }

    return fail(500)
  },
)

export default fetchWish
