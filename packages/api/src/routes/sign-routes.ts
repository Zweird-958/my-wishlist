import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import jsonwebtoken from "jsonwebtoken"

import { eq, hashPassword, lower, users } from "@my-wishlist/db"
import { signInSchema, signUpSchema } from "@my-wishlist/schemas"

import config from "../utils/config"

const app = new Hono()
  .post(
    "/sign-in",
    zValidator("json", signInSchema),
    async ({ req, var: { send, fail, db } }) => {
      const { email, password } = req.valid("json")
      const passwordHash = hashPassword(password)

      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
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
  .post(
    "/sign-up",
    zValidator("json", signUpSchema),
    async ({ req, var: { send, fail, db } }) => {
      const { email, username, password } = req.valid("json")

      const existingUsername = await db.query.users.findFirst({
        where: eq(lower(users.username), username.toLowerCase()),
      })

      if (existingUsername) {
        return fail("usernameExists")
      }

      if (await db.query.users.findFirst({ where: eq(users.email, email) })) {
        return send(true)
      }

      await db.insert(users).values({
        email,
        passwordHash: hashPassword(password),
        username,
      })

      return send(true)
    },
  )

export default app
