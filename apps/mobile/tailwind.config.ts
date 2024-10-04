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
      opacity: {
        disabled: "0.5",
      },
      colors: {
        primary: {
          DEFAULT: "#ff6347",
          foreground: "#FFF",
        },
        success: {
          DEFAULT: "#32CD32",
          foreground: "#FFF",
        },
        danger: {
          DEFAULT: "#FF4136",
          foreground: "#FFF",
        },
        warning: {
          DEFAULT: "#FFA500",
          foreground: "#FFF",
        },
        foreground: "#000000",
        background: "#FFF",
        card: { DEFAULT: "#d4d4d8", foreground: "#000000" },
      },
    },
  },
} satisfies Config
