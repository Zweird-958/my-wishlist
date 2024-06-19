"use client"

import { useDisclosure } from "@nextui-org/react"

import { useTranslation } from "@my-wishlist/i18n"
import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"

import AddButton from "@/components/ui/AddButton"
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
  const { t } = useTranslation()

  if (!session && !sessionIsLoading) {
    return (
      <AuthWishlist
        header={t("notLogged")}
        body={t("mustLoggedIn")}
        button={t("signIn")}
      />
    )
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
