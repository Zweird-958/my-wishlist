import { PutObjectCommand } from "@aws-sdk/client-s3"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"

import { imageMobileSchema } from "@my-wishlist/schemas"

import auth from "@/api/middlewares/auth"
import config from "@/api/utils/config"
import s3 from "@/api/utils/s3"

const app = new Hono()

const formDataSchema = z.object({
  image: z.instanceof(File).optional(),
})

const jsonSchema = z.object({
  image: imageMobileSchema.optional(),
})

app.post(
  "/",
  auth,
  zValidator("form", formDataSchema),
  zValidator("json", jsonSchema),
  async ({ req, var: { send, fail } }) => {
    const getImage = () => {
      const { image: formImage } = req.valid("form")

      if (formImage) {
        return formImage
      }

      const { image: jsonImage } = req.valid("json")

      if (jsonImage) {
        return jsonImage
      }

      return null
    }

    const image = getImage()

    if (!image) {
      return fail("imageRequired")
    }

    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const isFile = image instanceof File

    const command = new PutObjectCommand({
      Bucket: config.upload.bucket,
      Key: imageName,
      ContentType: image.type,
      Body: isFile
        ? Buffer.from(await image.arrayBuffer())
        : Buffer.from(image.uri, "base64"),
    })

    await s3.send(command)

    return send(imageName)
  },
)

export default app
