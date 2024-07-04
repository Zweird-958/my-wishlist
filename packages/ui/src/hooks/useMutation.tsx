import {
  QueryClient,
  UseMutationOptions,
  UseMutationResult,
  useMutation as useMutationGeneric,
} from "@tanstack/react-query"
import { AxiosError, AxiosRequestConfig } from "axios"

import { ApiError, ApiResponse, Method } from "@my-wishlist/types/Api"

import { useSession } from "../components/AppContext"
import api from "../utils/api"
import useHandleError, { HandleErrorParams } from "./useHandleError"

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
