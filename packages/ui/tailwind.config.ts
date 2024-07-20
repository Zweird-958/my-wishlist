import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

import baseConfig from "@my-wishlist/tailwind"

const config = {
  content: [
    ...baseConfig.content,
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [baseConfig],
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            success: {
              foreground: "#FFFFFF",
            },
            warning: {
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            success: {
              foreground: "#FFFFFF",
            },
            warning: {
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
  darkMode: "class",
} satisfies Config

export default config
