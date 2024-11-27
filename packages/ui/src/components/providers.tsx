import { ThemeProvider as DefaultThemeProvider } from "next-themes"
import type { ComponentProps } from "react"

export { AppProvider } from "./AppContext"
export { QueryClientProvider, QueryClient } from "@my-wishlist/react"
export const ThemeProvider = (
  props: Omit<ComponentProps<typeof DefaultThemeProvider>, "attribute">,
) => <DefaultThemeProvider attribute="class" {...props} />
export { CurrenciesProvider } from "../contexts/currencies-context"
