import { S3Client } from "@aws-sdk/client-s3"

import config from "@/api/utils/config"

const s3 = new S3Client({
  region: "auto",
  endpoint: config.upload.url,
  forcePathStyle: true,
  credentials: {
    accessKeyId: config.upload.accessKeyId,
    secretAccessKey: config.upload.secretAccessKey,
  },
})

export default s3
