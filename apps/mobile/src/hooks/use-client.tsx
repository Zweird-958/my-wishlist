import { hc } from "hono/client"

import type { AppType } from "@my-wishlist/api"
import { config } from "@my-wishlist/utils"

import { useSession } from "@/components/contexts/SessionContext"

const useClient = () => {
  const { session } = useSession()

  const headers = {
    Authorization: session ?? "",
  }

  return hc<AppType>(config.apiUrl.replace("/api", ""), { headers }).api
}

export default useClient
