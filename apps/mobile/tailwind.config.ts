// @ts-expect-error - no types
import nativewind from "nativewind/preset"
import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {},
  presets: [baseConfig, nativewind],
}

export default config
