"use client"

import { useDisclosure } from "@nextui-org/react"

import useWishlist from "../../hooks/useWishlist"
import AddButton from "../AddButton"
import { useSession } from "../AppContext"
import AuthWishlist from "../user/AuthWishlist"
import AddWishForm from "../wishlist/AddWishForm"
import WishlistDisplay from "../wishlist/WishlistDisplay"

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
