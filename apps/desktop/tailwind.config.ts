import type { Config } from "tailwindcss"

import uiConfig from "../../packages/ui/tailwind.config"

const config: Config = {
  content: [
    ...(uiConfig.content as string[]),
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [uiConfig],
}
export default config
