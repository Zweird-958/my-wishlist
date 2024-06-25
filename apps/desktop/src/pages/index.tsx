import AuthWishlist from "@my-wishlist/ui/user/AuthWishlist"

import useTranslation from "@/hooks/useTranslation"

const Home = () => {
  const {
    t: { common },
  } = useTranslation()

  return (
    <AuthWishlist
      header={common.notLogged}
      body={common.mustLoggedIn}
      button={common.signIn}
    />
  )
}

export default Home
