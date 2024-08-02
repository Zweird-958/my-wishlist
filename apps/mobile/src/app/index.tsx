import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link, Stack } from "expo-router"
import { Animated, FlatList, Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import type { ApiResponse, Product } from "@my-wishlist/types"

import { Button } from "@/components/ui/Button"
import tw from "@/utils/tw"

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

      <View style={tw.style("px-20")}>
        <Button>
          <Text style={{ color: "red" }}>Test</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default Index
