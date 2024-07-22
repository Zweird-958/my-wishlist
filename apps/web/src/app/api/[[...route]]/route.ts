import { PrismaClient } from "@prisma/client"
import { Hono } from "hono"
import { handle } from "hono/vercel"

import { ERROR_RESPONSES } from "@/api/constants"
import wishApp from "@/api/routes/wishesRoutes"

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

declare module "hono" {
  interface ContextVariableMap {
    db: typeof prisma
    send: (data: unknown, meta?: unknown) => void
    fail: (errorName: keyof typeof ERROR_RESPONSES) => void
  }
}

const app = new Hono().basePath("/api")

const contextVariables = {
  db: prisma,
}

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

  return next()
})

app.route("/wish", wishApp)

export const GET = handle(app)
export const POST = handle(app)
