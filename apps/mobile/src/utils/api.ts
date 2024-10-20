import * as SecureStore from "expo-secure-store"

import { type api as genericApi, call as genericCall } from "@my-wishlist/utils"

import config from "@/utils/config"

type Params = Parameters<typeof genericApi.delete>

const call =
  (method: keyof typeof genericApi) =>
  async <TData, TMeta = object>(
    path: Params[0],
    data: Params[1] = null,
    options: Params[2] = {},
  ) => {
    const session = await SecureStore.getItemAsync(config.store.session)

    const currentCall = genericCall(method)

    return currentCall<TData, TMeta>(path, data, {
      ...options,
      headers: { Authorization: session },
    })
  }

const api = {
  post: call("post"),
  get: call("get"),
  patch: call("patch"),
  delete: call("delete"),
}

export default api
