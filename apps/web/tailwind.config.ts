import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
  presets: [baseConfig],
}
export default config
