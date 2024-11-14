import { z } from "zod"

const schema = z.object({
  apiUrl: z.string(),
})

const getApiUrl = () => {
  if (process.env.VERCEL_ENV === "preview") {
    return `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.VERCEL_URL}${process.env.NEXT_PUBLIC_API_PATH}`
  }

  return process.env.NEXT_PUBLIC_API_URL ?? process.env.EXPO_PUBLIC_API_URL
}

const config = schema.parse({
  apiUrl: getApiUrl(),
})

export default config
