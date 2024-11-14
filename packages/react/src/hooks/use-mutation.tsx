import {
  type UseMutationOptions,
  useMutation as useGenericMutation,
} from "@tanstack/react-query"
import { type InferRequestType, type InferResponseType } from "hono/client"

import {
  ApiClientError,
  type HonoClientFunction,
  type ResponseFiltered,
} from "@my-wishlist/api"
import type { ApiError } from "@my-wishlist/types"

export type MutationOptions<T extends HonoClientFunction> = Omit<
  UseMutationOptions<
    Exclude<InferResponseType<T>, { error: unknown }>,
    ApiClientError,
    InferRequestType<T>
  >,
  "mutationFn"
>

export const useMutation = <T extends HonoClientFunction>(
  request: T,
  options: MutationOptions<T> = {},
) =>
  useGenericMutation({
    mutationFn: async (variables) => {
      const response = await request(variables)

      if (response.ok) {
        return response.json() as ResponseFiltered<T>
      }

      const error = (await response.json()) as ApiError

      throw new ApiClientError(error.error, response.status)
    },
    ...options,
  })

export { useGenericMutation }
