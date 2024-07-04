"use client"

import { useDisclosure } from "@nextui-org/react"
import { useEffect } from "react"

import { Wish } from "@my-wishlist/types/Wish"

import useQuery from "../../hooks/useQuery"
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
  const { data, isLoading: wishlistIsLoading } = useQuery<Wish[]>({
    method: "get",
    path: "/wish",
    queryKey: [session],
    enabled: wishlist.length === 0 && Boolean(session),
  })

  useEffect(() => {
    if (!data?.result || !session || wishlist.length > 0) {
      return
    }

    setWishlist(data?.result || [])
  }, [data?.result, session, setWishlist, wishlist.length])

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
      canEdit
    >
      <AddButton onPress={onOpen} color="primary" />
      <AddWishForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </WishlistDisplay>
  )
}

export default Home
