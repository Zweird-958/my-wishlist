# Monorepo

### Change name

To change name of the project, replace all `@my-wishlist` with your project name. I recommend to use `@` in the name of the project.

### Init project

```bash
# Install dependencies
bun i

cp .env.example .env

# Symlink env
bun run env-symlink
```

### Start project

```bash
# Web
bun run web

# iOS (macOS only)
bun run mobile:ios

# Android
bun run mobile:android
```
