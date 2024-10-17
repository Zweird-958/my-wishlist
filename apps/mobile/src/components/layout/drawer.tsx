import { Drawer as ExpoDrawer } from "expo-router/drawer"

import DrawerContent from "@/components/layout/drawer-content"

const Drawer = () => (
  <ExpoDrawer
    screenOptions={{
      headerShown: false,
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  />
)

export default Drawer
