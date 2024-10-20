import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery as useQueryGeneric,
} from "@tanstack/react-query"
import type { AxiosError, AxiosRequestConfig } from "axios"

import type { ApiError, ApiResponse, Method } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "../components/AppContext"

type CustomUseQueryOptions<
  TQueryFnData,
  TError,
  TData = ApiResponse<TQueryFnData>,
> = Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryFn">

type FetchOptions = {
  options?: AxiosRequestConfig
  method: Lowercase<Method>
  path: string
}

const useQuery = <
  TQueryFnData = unknown,
  TMeta = object,
  TData = TQueryFnData,
>({
  method,
  path,
  options: fetchOptions = {},
  ...options
}: CustomUseQueryOptions<
  ApiResponse<TQueryFnData, TMeta>,
  AxiosError<ApiError>,
  ApiResponse<TData, TMeta>
> &
  FetchOptions): UseQueryResult<
  ApiResponse<TData, TMeta>,
  AxiosError<ApiError>
> => {
  const { token } = useSession()

  fetchOptions.headers = {
    authorization: token,
  }

  return useQueryGeneric<
    ApiResponse<TQueryFnData, TMeta>,
    AxiosError<ApiError>,
    ApiResponse<TData, TMeta>
  >({
    queryFn: () => api[method](path, null, fetchOptions),
    ...options,
    queryKey: [path, fetchOptions, ...options.queryKey],
  })
}

export default useQuery
