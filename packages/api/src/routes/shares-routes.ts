import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

import {
  and,
  eq,
  lower,
  users,
  wishes,
  wishlistShared as wishlistSharedTable,
} from "@my-wishlist/db"
import { shareSchema } from "@my-wishlist/schemas"

import auth from "../middlewares/auth"
import formatUser from "../utils/format-user"
import formatWish from "../utils/format-wish"

const userParamsSchema = z.object({
  userId: z.coerce.number(),
})

const app = new Hono()
  .post(
    "/wish",
    auth,
    zValidator("json", shareSchema),
    async ({ req, var: { user, send, fail, db } }) => {
      const { username } = req.valid("json")

      if (username.toLowerCase() === user.username.toLowerCase()) {
        return fail("addHimSelf")
      }

      const userWithAccess = await db.query.users.findFirst({
        where: eq(lower(users.username), username),
      })

      if (!userWithAccess) {
        return fail("userNotFound")
      }

      const wishlistShared = await db.query.wishlistShared.findFirst({
        where: and(
          eq(wishlistSharedTable.ownerId, user.id),
          eq(wishlistSharedTable.viewerId, userWithAccess.id),
        ),
      })

      if (wishlistShared) {
        return fail("alreadyShared")
      }

      await db
        .insert(wishlistSharedTable)
        .values([{ ownerId: user.id, viewerId: userWithAccess.id }])

      return send(formatUser(userWithAccess))
    },
  )
  .get(
    "/wish/:userId",
    auth,
    zValidator("param", userParamsSchema),
    async ({ req, var: { user: authUser, send, fail, db, lang } }) => {
      const { userId } = req.valid("param")

      const shared = await db.query.wishlistShared.findFirst({
        where: and(
          eq(wishlistSharedTable.viewerId, authUser.id),
          eq(wishlistSharedTable.ownerId, userId),
        ),
        with: {
          owner: {
            columns: { username: true },
            with: {
              wishlist: {
                where: eq(wishes.isPrivate, false),
              },
            },
          },
        },
      })

      if (!shared) {
        return fail("userNotFound")
      }

      return send(
        shared.owner.wishlist.map((wish) => formatWish(wish, lang)),
        { username: shared.owner.username },
      )
    },
  )
  .get("/wish", auth, async ({ var: { user: authUser, send, db } }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, authUser.id),
      columns: {
        id: true,
      },
      with: {
        viewers: {
          with: {
            viewer: { columns: { id: true, username: true } },
          },
        },
      },
    })

    if (!user) {
      return send([])
    }

    return send(user.viewers.map(({ viewer }) => formatUser(viewer)))
  })
  .delete(
    "/wish/:userId",
    auth,
    zValidator("param", userParamsSchema),
    async ({ req, var: { user, send, fail, db } }) => {
      const { userId } = req.valid("param")

      const filter = and(
        eq(wishlistSharedTable.ownerId, user.id),
        eq(wishlistSharedTable.viewerId, userId),
      )

      const userWithAccess = await db.query.wishlistShared.findFirst({
        where: filter,
      })

      if (!userWithAccess) {
        return fail("userNotFound")
      }

      await db.delete(wishlistSharedTable).where(filter)

      return send(true)
    },
  )
  .get("/users", auth, async ({ var: { user, send, db } }) => {
    const userWithShared = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { id: true },
      with: {
        accessibleWishlists: {
          with: {
            owner: { columns: { id: true, username: true } },
          },
        },
      },
    })

    if (!userWithShared) {
      return send([])
    }

    return send(
      userWithShared.accessibleWishlists.map(({ owner }) => formatUser(owner)),
    )
  })

export default app
