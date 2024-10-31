import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import jsonwebtoken from "jsonwebtoken"

import { hashPassword } from "@my-wishlist/db"
import { signInSchema, signUpSchema } from "@my-wishlist/schemas"

import config from "../utils/config"

const app = new Hono()
  .post(
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
  .post(
    "/sign-up",
    zValidator("json", signUpSchema),
    async ({ req, var: { send, fail, db } }) => {
      const { email, username, password } = req.valid("json")

      const existingUsername = await db.user.findFirst({
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
      })

      if (existingUsername) {
        return fail("usernameExists")
      }

      if (await db.user.findFirst({ where: { email } })) {
        return send(true)
      }

      await db.user.create({
        data: {
          email,
          passwordHash: hashPassword(password),
          username,
        },
      })

      return send(true)
    },
  )

export default app
