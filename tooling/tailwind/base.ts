import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
  darkMode: "class",
} satisfies Config

export default config
