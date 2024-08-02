import type { Config } from "tailwindcss"

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        md: "12px",
      },
    },
  },
} satisfies Config
