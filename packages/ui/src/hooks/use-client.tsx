import { hc } from "hono/client"

import type { AppType } from "@my-wishlist/api"
import { config } from "@my-wishlist/utils"

import { useSession } from "../components/AppContext"

const useClient = () => {
  const { token } = useSession()

  const headers = {
    Authorization: token ?? "",
  }

  return hc<AppType>(config.apiUrl.replace("/api", ""), { headers }).api
}

export default useClient
