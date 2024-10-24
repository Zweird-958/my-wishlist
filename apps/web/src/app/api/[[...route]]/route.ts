import { PrismaClient } from "@prisma/client"
import { Hono, type TypedResponse } from "hono"
import { getCookie } from "hono/cookie"
import type { StatusCode } from "hono/utils/http-status"
import { handle } from "hono/vercel"
import { JsonWebTokenError } from "jsonwebtoken"

import { type Locale, languageSchemaFallback } from "@my-wishlist/i18n"

import { ERROR_RESPONSES } from "@/api/constants"
import currencyApp from "@/api/routes/currencyRoutes"
import imageApp from "@/api/routes/images-routes"
import shareApp from "@/api/routes/sharesRoutes"
import signApp from "@/api/routes/signRoutes"
import wishApp from "@/api/routes/wishesRoutes"

const prisma = new PrismaClient()

const contextVariables = {
  db: prisma,
}

type ContextVariables = typeof contextVariables

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends ContextVariables {
    send: (
      data: unknown,
      meta?: object,
    ) => Response &
      TypedResponse<{ result: unknown; meta: object }, StatusCode, "json">
    fail: (
      errorName: keyof typeof ERROR_RESPONSES,
    ) => Response &
      TypedResponse<
        { error: (typeof ERROR_RESPONSES)[typeof errorName]["message"] },
        StatusCode,
        "json"
      >
    lang: Locale
  }
}

const app = new Hono().basePath("/api")

app.use((ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", (data, meta = {}) => ctx.json({ result: data, meta }))
  ctx.set("fail", (errorName) =>
    ctx.json(
      { error: ERROR_RESPONSES[errorName].message },
      ERROR_RESPONSES[errorName].code,
    ),
  )
  ctx.set(
    "lang",
    languageSchemaFallback.parse(getCookie(ctx, "my-wishlist-language")),
  )

  return next()
})

app.route("/wish", wishApp)
app.route("", signApp)
app.route("/share", shareApp)
app.route("/currency", currencyApp)
app.route("/image", imageApp)

app.onError((error, { var: { fail } }) => {
  // eslint-disable-next-line no-console
  console.error(error)

  if (error instanceof JsonWebTokenError) {
    return fail(403)
  }

  return fail(500)
})

export const GET = handle(app)
export const POST = handle(app)
export const DELETE = handle(app)
export const PATCH = handle(app)
