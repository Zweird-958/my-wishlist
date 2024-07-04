import axios, { AxiosRequestConfig } from "axios"

import { ApiResponse, Method } from "@my-wishlist/types/Api"

import config from "./config"

const call =
  (method: Lowercase<Method>) =>
  async <TData, TMeta>(
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