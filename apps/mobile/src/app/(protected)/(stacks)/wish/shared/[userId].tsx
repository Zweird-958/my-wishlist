import { Stack, useLocalSearchParams } from "expo-router"

import { useClient } from "@my-wishlist/react"

import HeaderTitle from "@/components/layout/header-title"
import WishList from "@/components/wishlist/wish-list"
import { useProtectedQuery } from "@/hooks/use-query"

const WishlistShared = () => {
  const { userId } = useLocalSearchParams<{ userId: string }>()

  const { client } = useClient()
  const { data, isPending } = useProtectedQuery(
    () =>
      client.share.wish[":userId"].$get({
        param: {
          userId,
        },
      }),
    {
      queryKey: ["wishlistShared", userId],
    },
  )

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

      <WishList wishlist={data?.result ?? []} isLoading={isPending} />
    </>
  )
}

export default WishlistShared
