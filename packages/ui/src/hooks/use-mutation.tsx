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
import { type ApiError } from "@my-wishlist/types"

import useHandleError, { type HandleErrorParams } from "./useHandleError"

type Options<T extends HonoClientFunction> = HandleErrorParams &
  Omit<
    UseMutationOptions<
      Exclude<InferResponseType<T>, { error: unknown }>,
      ApiClientError,
      InferRequestType<T>
    >,
    "mutationFn" | "onError"
  >

const useMutation = <T extends HonoClientFunction>(
  request: T,
  { errorsMap, errorsCallback, ...options }: Options<T> = {},
) => {
  const { handleError } = useHandleError(errorsMap, errorsCallback)

  return useGenericMutation({
    mutationFn: async (variables) => {
      const response = await request(variables)

      if (response.ok) {
        return response.json() as ResponseFiltered<T>
      }

      const error = (await response.json()) as ApiError

      throw new ApiClientError(error.error, response.status)
    },
    ...options,
    onError: handleError,
  })
}
export default useMutation
