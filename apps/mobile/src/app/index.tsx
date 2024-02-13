import { useFetch } from "@hyper-fetch/react"
import { Stack } from "expo-router"
import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { getProducts } from "@my-wishlist/api/routes/products"

const Index = () => {
  const { data: products } = useFetch(getProducts)

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />
      <Text className="text-primary text-center text-5xl font-bold">
        Monorepo
      </Text>

      <FlatList
        data={products?.result}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  )
}

export default Index
