"use client"

import { useDisclosure } from "@nextui-org/react"

import useWishlist from "@my-wishlist/ui/hooks/useWishlist"
import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"
import AddWishForm from "@my-wishlist/ui/wishlist/AddWishForm"
import WishlistDisplay from "@my-wishlist/ui/wishlist/WishlistDisplay"

import AddButton from "@/components/ui/AddButton"
import useSession from "@/hooks/useSession"

const Home = () => {
  const { session, isLoading: sessionIsLoading } = useSession()
  const {
    wishlist,
    isLoading: wishlistIsLoading,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
  } = useWishlist()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  if (!session && !sessionIsLoading) {
    return <AuthWishlist />
  }

  return (
    <WishlistDisplay
      isLoading={sessionIsLoading || wishlistIsLoading}
      wishlist={wishlist}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    >
      <AddButton onPress={onOpen} color="primary" />
      <AddWishForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </WishlistDisplay>
  )
}

export default Home
