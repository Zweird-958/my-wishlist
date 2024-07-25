import { z } from "zod"

const schema = z.object({
  security: z.object({
    jwt: z.object({
      secret: z.string(),
      expiresIn: z.string(),
    }),
  }),
  upload: z.object({
    url: z.string(),
    bucket: z.string(),
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
  }),
})

const config = schema.parse({
  security: {
    jwt: {
      expiresIn: "60 days",
      secret: process.env.JWT_SECRET,
    },
  },
  upload: {
    url: process.env.S3_URL,
    bucket: process.env.S3_BUCKET_NAME,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

export default config
