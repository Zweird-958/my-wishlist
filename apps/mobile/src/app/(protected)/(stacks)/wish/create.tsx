import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"

import type { AddWishSchema, Wish } from "@my-wishlist/types"

import { useWishlist } from "@/components/contexts/WishlistContext"
import WishForm from "@/components/wishlist/wish-form"
import api from "@/utils/api"

const CreateWish = () => {
  const { addWish } = useWishlist()
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationKey: ["addWish"],
    mutationFn: (data: AddWishSchema) => api.post<Wish>("/wish", data),
    onSuccess: ({ result }) => {
      addWish(result)
      router.back()
    },
  })

  return <WishForm isLoading={isPending} onSubmit={mutate} />
}

export default CreateWish
