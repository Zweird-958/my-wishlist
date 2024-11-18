import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"
import tailwindAnimate from "tailwindcss-animate"

import baseConfig from "@my-wishlist/tailwind"

const config = {
  content: [
    ...baseConfig.content,
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
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
