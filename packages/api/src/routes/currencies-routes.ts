import { Hono } from "hono"

import config from "@my-wishlist/config"

const app = new Hono().get("/", ({ var: { send } }) => send(config.currencies))

export default app
