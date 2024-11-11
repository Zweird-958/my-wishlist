import { zValidator } from "@hono/zod-validator"
import { createFactory } from "hono/factory"
import { z } from "zod"

import { and, eq, wishes } from "@my-wishlist/db"
import type { WishTable } from "@my-wishlist/types"

import type { User } from "@/api/types"

type Env = {
  Variables: {
    wish: WishTable
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

    const wish = await db.query.wishes.findFirst({
      where: and(
        eq(wishes.id, parseInt(wishId, 10)),
        eq(wishes.userId, user.id),
      ),
    })

    if (!wish) {
      return fail("wishNotFound")
    }

    set("wish", wish)

    return next()
  },
)

export default fetchWish
