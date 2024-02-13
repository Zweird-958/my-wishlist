import { Stack } from "expo-router"

import Providers from "@/app/providers"

import "../global.css"

const RootLayout = () => (
  <Providers>
    <Stack />
  </Providers>
)

export default RootLayout
