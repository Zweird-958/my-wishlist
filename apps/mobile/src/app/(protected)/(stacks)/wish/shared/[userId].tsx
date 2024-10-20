import { useQuery } from "@tanstack/react-query"
import { Stack, useLocalSearchParams } from "expo-router"

import type { Wish } from "@my-wishlist/types"

import HeaderTitle from "@/components/layout/header-title"
import CenteredSpinner from "@/components/ui/spinner/centered-spinner"
import WishList from "@/components/wishlist/wish-list"
import api from "@/utils/api"

const WishlistShared = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { data, isPending } = useQuery({
    queryKey: ["wishlistShared", userId],
    queryFn: () =>
      api.get<Wish[], { username: string }>(`/share/wish/${userId}`),
  })

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderTitle
              label={isPending ? "loading" : "userWishlistShared"}
              options={{ username: data?.meta.username }}
            />
          ),
        }}
      />
      {isPending ? (
        <CenteredSpinner />
      ) : (
        <WishList wishlist={data?.result ?? []} />
      )}
    </>
  )
}

export default WishlistShared
