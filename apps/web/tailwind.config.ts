import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

import uiConfig from "../../packages/ui/tailwind.config"
import baseConfig from "../../tailwind.config"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [nextui()],
  darkMode: "class",
  presets: [baseConfig, uiConfig],
}
export default config
