// @ts-expect-error - no types
import nativewind from "nativewind/preset"
import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {},
  presets: [nativewind],
}

export default config
