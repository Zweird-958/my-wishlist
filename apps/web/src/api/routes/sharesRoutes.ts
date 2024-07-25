import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

import { shareSchema } from "@my-wishlist/schemas"

import auth from "@/api/middlewares/auth"

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

export default app
