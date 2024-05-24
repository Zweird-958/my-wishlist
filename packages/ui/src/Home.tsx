"use client"

import { useDisclosure } from "@nextui-org/react"

import useSession from "./hooks/useSession"
import useWishlist from "./hooks/useWishlist"
import AddButton from "./ui/AddButton"
import AuthWishlist from "./user/AuthWishlist"
import AddWishForm from "./wishlist/AddWishForm"
import WishlistDisplay from "./wishlist/WishlistDisplay"

const Home = () => {
  const {
    wishlist,
    isLoading: wishlistIsLoading,
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
  } = useWishlist()
  const { session, isLoading: sessionIsLoading } = useSession()
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
