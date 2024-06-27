import { useTranslation } from "@my-wishlist/i18n/utils"
import useWishlist from "@my-wishlist/ui/hooks/useWishlist"
import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"
import WishlistDisplay from "@my-wishlist/ui/wishlist/WishlistDisplay"

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
  } = useWishlist(session)
  // NECESSARY TO LOAD NAMESPACES
  const { t: _ } = useTranslation("forms", "zodErrors", "errors")

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
      session={session}
    />
  )
}

export default Home
