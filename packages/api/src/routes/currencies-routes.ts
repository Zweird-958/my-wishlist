import { Currency } from "@prisma/client"
import { Hono } from "hono"

const app = new Hono().get("/", ({ var: { send } }) =>
  send(Object.keys(Currency) as Currency[]),
)

export default app
