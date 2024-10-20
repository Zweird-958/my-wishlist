import {
  type QueryClient,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation as useMutationGeneric,
} from "@tanstack/react-query"
import type { AxiosError, AxiosRequestConfig } from "axios"

import type { ApiError, ApiResponse, Method } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "../components/AppContext"
import useHandleError, { type HandleErrorParams } from "./useHandleError"

type CustomUseMutationOptions<TData, TError, TVariables, TContext> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationFn"
>

type FetchOptions<TVariables> = {
  options?: AxiosRequestConfig
  method: Lowercase<Method>
  path: ((data: TVariables) => string) | string
}

const useMutation = <TData, TVariables = void, TContext = unknown>(
  {
    method,
    path,
    options: fetchOptions = {},
    errorsMap,
    errorsCallback,
    ...options
  }: CustomUseMutationOptions<
    ApiResponse<TData>,
    AxiosError<ApiError>,
    TVariables,
    TContext
  > &
    FetchOptions<TVariables> &
    HandleErrorParams,
  queryClient?: QueryClient,
): UseMutationResult<
  ApiResponse<TData>,
  AxiosError<ApiError>,
  TVariables,
  TContext
> => {
  const { handleError } = useHandleError(errorsMap, errorsCallback)
  const { token } = useSession()
  const fetchPath = typeof path === "function" ? path : () => path

  fetchOptions.headers = {
    authorization: token,
  }

  return useMutationGeneric<
    ApiResponse<TData>,
    AxiosError<ApiError>,
    TVariables,
    TContext
  >(
    {
      mutationFn: (data) => api[method](fetchPath(data), data, fetchOptions),
      onError: handleError,
      ...options,
    },
    queryClient,
  )
}

export default useMutation
