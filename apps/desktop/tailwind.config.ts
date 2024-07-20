import type { Config } from "tailwindcss"

import uiConfig from "@my-wishlist/ui/tailwind"

const config = {
  content: [
    ...uiConfig.content,
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [uiConfig],
} satisfies Config

export default config
