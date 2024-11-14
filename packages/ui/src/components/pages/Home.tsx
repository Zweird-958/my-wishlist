"use client"

import { useDisclosure } from "@nextui-org/react"
import { useEffect } from "react"

import useClient from "../../hooks/use-client"
import { useProtectedQuery } from "../../hooks/use-query"
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
    selectedFilter,
    setSelectedFilter,
    selectedSort,
    setSelectedSort,
    setWishlist,
  } = useWishlist()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const client = useClient()
  const { data, isPending: wishlistIsLoading } = useProtectedQuery(
    () => client.wish.$get(),
    {
      queryKey: [session, "wish"],
    },
  )

  useEffect(() => {
    if (!data?.result || !session || wishlist.length > 0) {
      return
    }

    setWishlist(data.result)
  }, [data?.result, session, setWishlist, wishlist.length])

  if (!session && !sessionIsLoading) {
    return <AuthWishlist />
  }

  return (
    <>
      <WishlistDisplay
        isLoading={sessionIsLoading || wishlistIsLoading}
        wishlist={wishlist}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        canEdit
      />
      <AddWishForm isOpen={isOpen} onOpenChange={onOpenChange} />
      <AddButton onPress={onOpen} color="primary" />
    </>
  )
}

export default Home
