"use client"

import { Button, useDisclosure } from "@nextui-org/react"
import { Plus } from "lucide-react"

import LoadingScreen from "@my-wishlist/ui/ui/LoadingScreen"

import AuthWishlist from "@/components/user/AuthWishlist"
import AddWishForm from "@/components/wishlist/AddWishForm"
import WishList from "@/components/wishlist/WishList"
import WishlistEmpty from "@/components/wishlist/WishlistEmpty"
import useSession from "@/hooks/useSession"
import useWishlist from "@/hooks/useWishlist"

const Home = () => {
  const { wishlist, isLoading: wishlistIsLoading } = useWishlist()
  const { session, isLoading: sessionIsLoading } = useSession()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (sessionIsLoading || wishlistIsLoading) {
    return <LoadingScreen />
  }

  if (!session) {
    return <AuthWishlist />
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty />
  }

  return (
    <>
      <WishList wishes={wishlist} />
      <Button
        className="fixed bottom-6 right-6 z-20"
        color="primary"
        isIconOnly
        onPress={onOpen}
      >
        <Plus />
      </Button>
      <AddWishForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}

export default Home
