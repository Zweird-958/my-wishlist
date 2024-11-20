import { Hono } from "hono"
import { getCookie } from "hono/cookie"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"
import { JsonWebTokenError } from "jsonwebtoken"

import { config } from "@my-wishlist/config/i18n"
import { languageSchemaFallback } from "@my-wishlist/i18n-schemas"

import currencies from "./routes/currencies-routes"
import image from "./routes/images-routes"
import shares from "./routes/shares-routes"
import sign from "./routes/sign-routes"
import wish from "./routes/wishes-routes"
import { contextVariables, fail, send } from "./utils/context"

const app = new Hono().basePath("/api")

app.use(cors(), (ctx, next) => {
  Object.entries(contextVariables).forEach(([name, value]) => {
    ctx.set(name as never, value as never)
  })
  ctx.set("send", send(ctx))
  ctx.set("fail", fail(ctx))
  ctx.set(
    "lang",
    languageSchemaFallback.parse(getCookie(ctx, config.cookieLanguageKey)),
  )

  return next()
})

app.route("/image", image)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/wish", wish)
  .route("/", sign)
  .route("/currency", currencies)
  .route("/share", shares)

app.onError((error, { var: { fail: ctxFail } }) => {
  // eslint-disable-next-line no-console
  console.error(error)

  if (error instanceof JsonWebTokenError) {
    return ctxFail(403)
  }

  return ctxFail(500)
})

export type AppType = typeof routes
export default handle(app)
