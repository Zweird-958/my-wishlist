import type { Theme as ThemeNative } from "@react-navigation/native"

export type Theme = {
  primaryForeground: string
  foreground: string
  danger: string
  success: string
} & ThemeNative["colors"]
