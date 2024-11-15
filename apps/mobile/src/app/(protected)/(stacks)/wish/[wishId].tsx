import { useLocalSearchParams, useRouter } from "expo-router"

import { useClient, useMutation } from "@my-wishlist/react"
import type { AddWishSchema } from "@my-wishlist/types"

import { useWishlist } from "@/components/contexts/WishlistContext"
import WishForm from "@/components/wishlist/wish-form"

const EditWishPage = () => {
  const { wishId } = useLocalSearchParams<{ wishId: string }>()
  const { getWish, editWish } = useWishlist()
  const router = useRouter()

  const wish = getWish(Number(wishId))

  const { client } = useClient()
  const { mutate, isPending } = useMutation(client.wish[":wishId"].$patch, {
    mutationKey: ["editWish", wishId],
    onSuccess: ({ result }) => {
      editWish(result)
      router.back()
    },
  })

  const onSubmit = (data: AddWishSchema) => {
    mutate({ json: data, param: { wishId } })
  }

  return <WishForm wish={wish} isLoading={isPending} onSubmit={onSubmit} />
}

export default EditWishPage
