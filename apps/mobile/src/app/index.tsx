import { Link, Stack } from "expo-router"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Text } from "@/components/ui/Text"
import { Button } from "@/components/ui/button"

const Index = () => {
  const { tw } = useTheme()

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />

      <View style={tw.style("px-20 gap-4")}>
        <Link style={tw.style("text-foreground")} href="/sign-in">
          Sign In
        </Link>
        <Button radius="small">
          <Text>Test</Text>
        </Button>
        <Button radius="medium" color="success">
          <Text>Test</Text>
        </Button>
        <Button radius="large" color="danger">
          <Text>Test</Text>
        </Button>
        <Button radius="full">
          <Text>Test</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Index
