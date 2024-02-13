import type { Config } from "tailwindcss"

const config: Config = {
  content: ["src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
      },
    },
  },
}

export default config
