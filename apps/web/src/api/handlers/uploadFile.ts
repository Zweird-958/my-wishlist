import { PutObjectCommand } from "@aws-sdk/client-s3"
import { zValidator } from "@hono/zod-validator"
import { createFactory } from "hono/factory"
import { z } from "zod"

import config from "@/api/utils/config"
import s3 from "@/api/utils/s3"

const factory = createFactory<{ Variables: { image: string } }>()

const schema = z.object({
  image: z.instanceof(File).optional(),
})

const uploadFile = factory.createHandlers(
  zValidator("form", schema),
  async ({ req, set }, next) => {
    const { image } = req.valid("form")

    if (!image) {
      await next()

      return
    }

    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`

    const command = new PutObjectCommand({
      Bucket: config.upload.bucket,
      Key: imageName,
      ContentType: image.type,
      Body: Buffer.from(await image.arrayBuffer()),
    })

    await s3.send(command)

    set("image", `${config.upload.url}/${config.upload.bucket}/${imageName}`)

    await next()
  },
)

export default uploadFile
