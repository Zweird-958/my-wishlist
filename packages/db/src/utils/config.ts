import { z } from "zod"

const schema = z.object({
  security: z.object({
    password: z.object({
      salt: z.string(),
      keylen: z.number(),
      iterations: z.number(),
      digest: z.string(),
    }),
  }),
})

const config = schema.parse({
  security: {
    password: {
      salt: process.env.PASSWORD_SALT,
      keylen: parseInt(process.env.PASSWORD_KEYLEN!, 10),
      iterations: parseInt(process.env.PASSWORD_ITERATIONS!, 10),
      digest: "sha512",
    },
  },
})

export default config
