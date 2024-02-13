import { z } from "zod"

const schema = z
  .object({
    vercelUrl: z
      .string()
      .optional()
      .transform((v) => v && `https://${v}`),
    apiUrl: z.string().optional(),
  })
  .refine((data) => data.vercelUrl || data.apiUrl, {
    path: ["apiUrl"],
    message: "apiUrl is required",
  })
const config = schema.parse({
  vercelUrl: process.env.VERCEL_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL,
})

export default config
