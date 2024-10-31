import { ClientRequestOptions } from "hono"
import { ClientResponse, InferResponseType } from "hono/client"

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
