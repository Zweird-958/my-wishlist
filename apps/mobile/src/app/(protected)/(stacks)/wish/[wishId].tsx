import { useMutation } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"

import type { Wish } from "@my-wishlist/types"

import { useWishlist } from "@/components/contexts/WishlistContext"
import WishForm from "@/components/wishlist/wish-form"
import api from "@/utils/api"

const EditWishPage = () => {
  const { wishId } = useLocalSearchParams<{ wishId: string }>()
  const { getWish, editWish } = useWishlist()
  const router = useRouter()

  const wish = getWish(Number(wishId))

  const { mutate, isPending } = useMutation({
    mutationKey: ["editWish", wishId],
    mutationFn: (data: FormData) => api.patch<Wish>(`/wish/${wishId}`, data),
    onSuccess: ({ result }) => {
      editWish(result)
      router.back()
    },
  })

  return <WishForm wish={wish} isLoading={isPending} onSubmit={mutate} />
}

export default EditWishPage
