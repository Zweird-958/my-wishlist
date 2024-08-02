import { Stack } from "expo-router"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button } from "@/components/ui/Button"

const Index = () => {
  const { tw } = useTheme()

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />

      <View style={tw.style("px-20 gap-4")}>
        <Button radius="small">
          <Text style={{ color: "blue" }}>Test</Text>
        </Button>
        <Button radius="medium" color="success">
          <Text style={{ color: "blue" }}>Test</Text>
        </Button>
        <Button radius="large" color="danger">
          <Text style={{ color: "blue" }}>Test</Text>
        </Button>
        <Button radius="full">
          <Text style={{ color: "blue" }}>Test</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Index
