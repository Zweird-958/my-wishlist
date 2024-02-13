import { Client } from "@hyper-fetch/core"

import config from "./config"

const client = new Client({
  url: config.apiUrl || `${config.vercelUrl}/api`,
})

export default client
