import { Stack } from "expo-router"

import Providers from "@/app/providers"

const RootLayout = () => (
  <Providers>
    <Stack />
  </Providers>
)

export default RootLayout
