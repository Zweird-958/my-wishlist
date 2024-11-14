import { type HonoClientFunction } from "@my-wishlist/api"
import {
  type MutationOptions,
  useMutation as useGenericMutation,
} from "@my-wishlist/react"

import useHandleError, { type HandleErrorParams } from "./useHandleError"

type Options<T extends HonoClientFunction> = HandleErrorParams &
  Omit<MutationOptions<T>, "onError">

const useMutation = <T extends HonoClientFunction>(
  request: T,
  { errorsMap, errorsCallback, ...options }: Options<T> = {},
) => {
  const { handleError } = useHandleError(errorsMap, errorsCallback)

  return useGenericMutation(request, {
    ...options,
    onError: handleError,
  })
}

export default useMutation
