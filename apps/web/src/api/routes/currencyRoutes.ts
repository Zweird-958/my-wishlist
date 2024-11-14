import { Hono } from "hono"

import { currencies } from "@my-wishlist/config"

const app = new Hono()

app.get("/", ({ var: { send } }) => send(currencies))

export default app
