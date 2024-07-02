import { useParams } from "next/navigation"

import WishlistShared from "@my-wishlist/ui/pages/WishlistShared"

const Page = () => {
  const { userId } = useParams<{ userId: string }>()

  return <WishlistShared userId={userId} />
}

export default Page
