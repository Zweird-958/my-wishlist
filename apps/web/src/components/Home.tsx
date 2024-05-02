"use client"

import { Button, useDisclosure } from "@nextui-org/react"
import { Plus } from "lucide-react"

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
      <Button
        className="fixed bottom-6 right-6 z-20"
        color="primary"
        isIconOnly
        onPress={onOpen}
      >
        <Plus />
      </Button>
      <AddWishForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </WishlistDisplay>
  )
}

export default Home
