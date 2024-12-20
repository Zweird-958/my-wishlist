import {
  type UseQueryOptions,
  useQuery as useGenericQuery,
} from "@tanstack/react-query"
import { type InferResponseType } from "hono/client"

import {
  ApiClientError,
  type HonoClientFunction,
  type ResponseFiltered,
} from "@my-wishlist/api"
import type { ApiError } from "@my-wishlist/types"

export type QueryOptions<T extends HonoClientFunction> = Omit<
  UseQueryOptions<InferResponseType<T>, ApiClientError>,
  "queryFn"
>

export const useQuery = <T extends HonoClientFunction>(
  request: T,
  options: QueryOptions<T>,
) =>
  useGenericQuery<ResponseFiltered<T>, ApiClientError>({
    queryFn: async (variables) => {
      const response = await request(variables)

      if (response.ok) {
        return response.json() as Promise<ResponseFiltered<T>>
      }

      const error = (await response.json()) as ApiError

      throw new ApiClientError(error.error, response.status)
    },
    ...options,
  })

export { useGenericQuery }
