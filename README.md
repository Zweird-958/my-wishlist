# Monorepo

### Change name

To change name of the project, replace all `@monorepo` with your project name. I recommend to use `@` in the name of the project.

### Init project

```bash
# Install dependencies
npm i

cp .env.example .env

# Symlink env
npm run env-symlink
```

### Start project

```bash
# Web
npm run web

# iOS (macOS only)
npm run mobile:ios

# Android
npm run mobile:android
```
