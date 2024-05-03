"use client"

import { useDisclosure } from "@nextui-org/react"

import AddButton from "@/components/ui/AddButton"
import AuthWishlist from "@/components/user/AuthWishlist"
import AddWishForm from "@/components/wishlist/AddWishForm"
import WishlistDisplay from "@/components/wishlist/WishlistDisplay"
import useSession from "@/hooks/useSession"
import useWishlist from "@/hooks/useWishlist"

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
