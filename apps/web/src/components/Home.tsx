"use client"

import { Button, useDisclosure } from "@nextui-org/react"
import { Plus } from "lucide-react"

import LoadingScreen from "@my-wishlist/ui/ui/LoadingScreen"

import AuthWishlist from "@/components/user/AuthWishlist"
import AddWishForm from "@/components/wishlist/AddWishForm"
import WishList from "@/components/wishlist/WishList"
import WishListDropdown from "@/components/wishlist/WishListDropdown"
import WishlistEmpty from "@/components/wishlist/WishlistEmpty"
import useSession from "@/hooks/useSession"
import useWishlist from "@/hooks/useWishlist"
import { Filter, Sort } from "@/utils/config"

const FILTERS: Filter[] = ["all", "purchased", "notPurchased"]
const SORTS: Sort[] = ["date", "priceAsc", "priceDesc"]

const Home = () => {
  const {
    wishlist,
    wishlistFiltered,
    isLoading: wishlistIsLoading,
    setSelectedFilter,
    selectedFilter,
    setSelectedSort,
    selectedSort,
  } = useWishlist()
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
      <div className="flex flex-col gap-4 max-w-wish mx-auto">
        <div className="flex justify-between">
          <WishListDropdown
            items={FILTERS.map((filter) => ({ key: filter, label: filter }))}
            selectedItem={selectedFilter}
            onSelectionChange={setSelectedFilter}
            translationKey="filters"
          />
          <WishListDropdown
            items={SORTS.map((sort) => ({ key: sort, label: sort }))}
            selectedItem={selectedSort}
            onSelectionChange={setSelectedSort}
            translationKey="sorts"
          />
        </div>
        <WishList wishes={wishlistFiltered} />
      </div>
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
