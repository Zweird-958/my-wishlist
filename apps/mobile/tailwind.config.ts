import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
      },
      colors: {
        primary: {
          DEFAULT: "#ff6347",
          foreground: "white",
        },
        success: "#32CD32",
        danger: {
          DEFAULT: "#FF4136",
          foreground: "white",
        },
        foreground: "black",
        background: "white",
        card: "#d4d4d8",
      },
    },
  },
} satisfies Config
