import { PrismaClient } from "@prisma/client"
import { Hono, type TypedResponse } from "hono"
import { getCookie } from "hono/cookie"
import { cors } from "hono/cors"
import type { StatusCode } from "hono/utils/http-status"
import { handle } from "hono/vercel"
import { JsonWebTokenError } from "jsonwebtoken"

import { type Locale, config, languageSchemaFallback } from "@my-wishlist/i18n"

import { ERROR_RESPONSES } from "./constants"
import currencies from "./routes/currencies-routes"
import image from "./routes/images-routes"
import shares from "./routes/shares-routes"
import sign from "./routes/sign-routes"
import wish from "./routes/wishes-routes"

const prisma = new PrismaClient()

const contextVariables = {
  db: prisma,
}

type ContextVariables = typeof contextVariables

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends ContextVariables {
    send: <TData, TMeta extends {} | Record<string, unknown>>(
      data: TData,
      meta?: TMeta,
    ) => Response &
      TypedResponse<{ result: TData; meta: TMeta }, StatusCode, "json">
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

app.use(cors(), (ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", (data, meta) => ctx.json({ result: data, meta: meta ?? {} }))
  ctx.set("fail", (errorName) =>
    ctx.json(
      { error: ERROR_RESPONSES[errorName].message },
      ERROR_RESPONSES[errorName].code,
    ),
  )
  ctx.set(
    "lang",
    languageSchemaFallback.parse(getCookie(ctx, config.cookieLanguageKey)),
  )

  return next()
})

app.route("/image", image)

const routes = app
  .route("/wish", wish)
  .route("/", sign)
  .route("/currency", currencies)
  .route("/share", shares)

app.onError((error, { var: { fail } }) => {
  // eslint-disable-next-line no-console
  console.error(error)

  if (error instanceof JsonWebTokenError) {
    return fail(403)
  }

  return fail(500)
})

export type AppType = typeof routes
export default handle(app)
