import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import jsonwebtoken from "jsonwebtoken"

import { hashPassword } from "@my-wishlist/db"
import { signInSchema } from "@my-wishlist/schemas"

import config from "@/api/utils/config"

const app = new Hono()

app.post(
  "/sign-in",
  zValidator("json", signInSchema),
  async ({ req, var: { send, fail, db } }) => {
    const { email, password } = req.valid("json")
    const passwordHash = hashPassword(password)

    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || user.passwordHash !== passwordHash) {
      return fail("invalidCredentials")
    }

    const sessionToken = jsonwebtoken
      .sign(
        {
          payload: {
            userId: user.id,
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn },
      )
      .toString()

    return send(sessionToken)
  },
)

export default app
