import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        wish: "20rem",
      },
      height: {
        wish: "20rem",
      },
      maxWidth: {
        wish: "62rem",
      },
    },
  },
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
}
export default config
