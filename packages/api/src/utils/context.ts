import { PrismaClient } from "@prisma/client"
import type { Context } from "hono"

import type { Locale } from "@my-wishlist/config/i18n"

import { ERROR_RESPONSES } from "../constants"

const prisma = new PrismaClient()

export const contextVariables = {
  db: prisma,
}

type ContextVariables = typeof contextVariables

export const send =
  (ctx: Context) =>
  <TData, TMeta extends object>(data: TData, meta: TMeta = {} as TMeta) =>
    ctx.json({
      result: data,
      meta,
    })

export const fail =
  (ctx: Context) => (errorName: keyof typeof ERROR_RESPONSES) =>
    ctx.json(
      { error: ERROR_RESPONSES[errorName].message },
      ERROR_RESPONSES[errorName].code,
    )

declare module "hono" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ContextVariableMap extends ContextVariables {
    send: ReturnType<typeof send>
    fail: ReturnType<typeof fail>
    lang: Locale
  }
}
