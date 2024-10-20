import { z } from "zod"

const schema = z.object({
  apiUrl: z.string(),
})

const config = schema.parse({
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? process.env.EXPO_PUBLIC_API_URL,
})

export default config
