import { useRouter } from "expo-router"

import { useMutation } from "@my-wishlist/react"
import type { AddWishSchema } from "@my-wishlist/types"

import { useWishlist } from "@/components/contexts/WishlistContext"
import WishForm from "@/components/wishlist/wish-form"
import useClient from "@/hooks/use-client"

const CreateWish = () => {
  const { addWish } = useWishlist()
  const router = useRouter()

  const client = useClient()
  const { mutate, isPending } = useMutation(client.wish.$post, {
    mutationKey: ["addWish"],
    onSuccess: ({ result }) => {
      addWish(result)
      router.back()
    },
  })

  const onSubmit = (data: AddWishSchema) => {
    mutate({ json: data })
  }

  return <WishForm isLoading={isPending} onSubmit={onSubmit} />
}

export default CreateWish
