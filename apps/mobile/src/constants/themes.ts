import type { Theme } from "@react-navigation/native"
import type { Config } from "tailwindcss"

import baseConfig from "../../tailwind.config"

export const DarkTheme: Theme["colors"] = {
  primary: "#ff6347",
  background: "black",
  card: "#3f3f46",
  text: "white",
  border: "#ff6347",
  notification: "#ff6347",
}

export const LightTheme: Theme["colors"] = {
  primary: "#ff6347",
  background: "white",
  card: "#d4d4d8",
  text: "black",
  border: "#ff6347",
  notification: "#ff6347",
}

export const darkConfig = {
  content: [...baseConfig.content],
  theme: {
    extend: {
      colors: {
        foreground: "white",
        background: "black",
        card: "#3f3f46",
      },
    },
  },
  presets: [baseConfig],
} satisfies Config

export const lightConfig = {
  content: [...baseConfig.content],
  theme: {},
  presets: [baseConfig],
} satisfies Config
