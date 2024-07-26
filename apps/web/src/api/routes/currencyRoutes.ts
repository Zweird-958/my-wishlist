import { Currency } from "@prisma/client"
import { Hono } from "hono"

const app = new Hono()

app.get("/", ({ var: { send } }) => send(Object.keys(Currency)))

export default app
