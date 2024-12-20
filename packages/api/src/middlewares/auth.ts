import { createMiddleware } from "hono/factory"
import jsonwebtoken from "jsonwebtoken"

import { eq, users } from "@my-wishlist/db"
import type { RawJwt } from "@my-wishlist/types"

import type { User } from "../types"
import config from "../utils/config"

type Env = {
  Variables: {
    user: User
  }
}

const auth = createMiddleware<Env>(
  async ({ req, var: { db, fail }, set }, next) => {
    const authorization = req.header("Authorization")

    if (!authorization) {
      return fail(403)
    }

    const { payload } = jsonwebtoken.verify(
      authorization,
      config.security.jwt.secret,
    ) as RawJwt

    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.userId),
    })

    if (!user) {
      return fail(403)
    }

    set("user", user)

    return next()
  },
)

export default auth
