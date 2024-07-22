import { z } from "zod"

const schema = z.object({
  security: z.object({
    jwt: z.object({
      secret: z.string(),
      expiresIn: z.string(),
    }),
  }),
})

const config = schema.parse({
  security: {
    jwt: {
      expiresIn: "60 days",
      secret: process.env.JWT_SECRET,
    },
  },
})

export default config
