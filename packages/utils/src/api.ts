import axios, { type AxiosRequestConfig } from "axios"

import type { ApiResponse, Method } from "@my-wishlist/types"

import config from "./config"

const call =
  (method: Lowercase<Method>) =>
  async <TData, TMeta = object>(
    path: string,
    data: unknown = null,
    options: AxiosRequestConfig = {},
  ) => {
    const opts = {
      baseURL: config.apiUrl,
      ...options,
    }

    const res = await axios[method]<ApiResponse<TData, TMeta>>(
      path,
      ["get", "delete"].includes(method) ? opts : data,
      opts,
    )

    return res.data
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
