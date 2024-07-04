import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Stack } from "expo-router"
import { FlatList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { ApiResponse } from "@my-wishlist/types/Api"
import type { Product } from "@my-wishlist/types/Product"

const Index = () => {
  const {
    data: { result },
  } = useQuery<ApiResponse<Product[]>>({
    queryFn: () => axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`),
    queryKey: ["products"],
    initialData: { result: [] } as unknown as ApiResponse<Product[]>,
  })

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Home Page" }} />
      <Text className="text-primary text-center text-5xl font-bold">
        Monorepo
      </Text>

      <FlatList
        data={result}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </SafeAreaView>
  )
}

export default Index
