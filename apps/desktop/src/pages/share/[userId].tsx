import { useRouter } from "next/router"

import WishlistShared from "@my-wishlist/ui/pages/WishlistShared"

const Page = () => {
  const router = useRouter()
  const { userId } = router.query as { userId: string }

  return <WishlistShared userId={userId} />
}

export default Page
