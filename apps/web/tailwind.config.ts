import type { Config } from "tailwindcss"

import uiConfig from "../../packages/ui/tailwind.config"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ...(uiConfig.content as string[]),
  ],
  presets: [uiConfig],
}
export default config
