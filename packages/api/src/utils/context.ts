import type { Context } from "hono"

import type { Locale } from "@my-wishlist/config/i18n"
import { db } from "@my-wishlist/db"

import { ERROR_RESPONSES } from "../constants"

export const contextVariables = {
  db,
}

type ContextVariables = typeof contextVariables
type Meta = Record<string, unknown>

export const send =
  (ctx: Context) =>
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  <TData, TMeta extends Meta = {}>(data: TData, meta: TMeta = {} as TMeta) =>
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
