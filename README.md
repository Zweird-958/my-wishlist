# Monorepo

### Change name

To change name of the project, replace all `@my-wishlist` with your project name. I recommend to use `@` in the name of the project.

### Init project

```bash
# Install dependencies
pnpm i

cp .env.example .env

# Symlink env
pnpm run env-symlink
```

### Start project

```bash
# Web
pnpm run web

# iOS (macOS only)
pnpm run mobile:ios

# Android
pnpm run mobile:android
```

### Initialize the S3 bucket

```bash
# Open a new shell in the Docker container
docker compose exec minio bash

# Create a new host
mc alias set local http://localhost:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

# Create the bucket
mc mb local/$MINIO_DEFAULT_BUCKET

# Set the bucket policy
mc anonymous set download local/$MINIO_DEFAULT_BUCKET
```

After creating the bucket, you can access the MinIO dashboard at [http://localhost:9001](http://localhost:9001) (if you didn't change the port).

The username and password are the same as the ones in the `.env` file (`MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`).
