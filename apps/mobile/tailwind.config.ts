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
        primary: "#ff6347",
        success: "#32CD32",
        danger: "#FF4136",
        foreground: "black",
        background: "white",
      },
    },
  },
} satisfies Config
