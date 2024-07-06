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
