import { Client } from "@hyper-fetch/core"

import config from "./config"

type GlobalErrorType = {
  error: string
}

const client = new Client<GlobalErrorType>({
  url: config.apiUrl || `${config.vercelUrl}/api`,
})

export default client
