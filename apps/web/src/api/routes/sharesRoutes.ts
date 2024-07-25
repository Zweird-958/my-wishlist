import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

import { shareSchema } from "@my-wishlist/schemas"

import auth from "@/api/middlewares/auth"
import formatWish from "@/api/utils/formatWish"

const userParamsSchema = z.object({
  userId: z.coerce.number(),
})

const app = new Hono()

app.post(
  "/wish",
  auth,
  zValidator("json", shareSchema),
  async ({ req, var: { user, send, fail, db } }) => {
    const { username } = req.valid("json")

    if (username.toLowerCase() === user.username.toLowerCase()) {
      return fail("addHimSelf")
    }

    const userWithAccess = await db.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: username,
              mode: "insensitive",
            },
          },
        ],
      },
      include: { wishlistShared: true },
    })

    if (!userWithAccess) {
      return fail("userNotFound")
    }

    const { email, wishlistShared } = userWithAccess

    if (wishlistShared.some(({ id }) => id === user.id)) {
      return fail("alreadyShared")
    }

    await db.user.update({
      where: {
        email,
      },
      data: {
        wishlistShared: {
          connect: user,
        },
      },
    })

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        sharedWith: {
          connect: {
            email,
          },
        },
      },
    })

    return send(true)
  },
)

app.get(
  "/wish/:userId",
  auth,
  zValidator("param", userParamsSchema),
  async ({ req, var: { user: authedUser, send, fail, db } }) => {
    const { userId } = req.valid("param")

    const user = await db.user.findUnique({
      where: {
        id: userId,
        sharedWith: {
          some: {
            id: authedUser.id,
          },
        },
      },
      include: {
        wishlist: {
          where: {
            isPrivate: false,
          },
        },
      },
    })

    if (!user) {
      return fail("userNotFound")
    }

    return send(user.wishlist.map(formatWish), { username: user.username })
  },
)

app.get("/wish", auth, async ({ var: { user, send, db } }) => {
  const userWithShared = await db.user.findFirst({
    where: {
      id: user.id,
    },
    include: {
      wishlistShared: true,
    },
  })

  if (!userWithShared) {
    return send([])
  }

  return send(
    userWithShared.wishlistShared.map(({ id, username }) => ({ id, username })),
  )
})

app.delete(
  "/wish/:userId",
  auth,
  zValidator("param", userParamsSchema),
  async ({ req, var: { user, send, fail, db } }) => {
    const { userId } = req.valid("param")

    const userWithAccess = await db.user.findFirst({
      where: {
        id: userId,
        wishlistShared: {
          some: {
            id: user.id,
          },
        },
      },
    })

    if (!userWithAccess) {
      return fail("userNotFound")
    }

    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        wishlistShared: {
          disconnect: {
            id: user.id,
          },
        },
      },
    })

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        sharedWith: {
          disconnect: {
            id: userId,
          },
        },
      },
    })

    return send(true)
  },
)

export default app
