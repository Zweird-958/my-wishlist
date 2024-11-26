import type { ClientRequestOptions } from "hono"
import type { ClientResponse, InferResponseType } from "hono/client"

import type { users, wishes } from "@my-wishlist/db"

export type HonoClientFunction =
  | ((
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: any,
      options?: ClientRequestOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ClientResponse<any, number, "json">>)
  | ((
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      args?: {},
      options?: ClientRequestOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => Promise<ClientResponse<any, number, "json">>)

export type ResponseFiltered<T extends HonoClientFunction> = Exclude<
  InferResponseType<T>,
  { error: unknown }
>

export type User = typeof users.$inferSelect
export type WishTable = typeof wishes.$inferSelect
