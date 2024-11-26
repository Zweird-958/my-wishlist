import { DeleteObjectCommand } from "@aws-sdk/client-s3"

import config from "./config"
import s3 from "./s3"

const deleteFile = async (image: string) => {
  const command = new DeleteObjectCommand({
    Bucket: config.upload.bucket,
    Key: image.split("/").slice(-1)[0],
  })

  await s3.send(command)
}

export default deleteFile
