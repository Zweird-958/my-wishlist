"use client"

import { useFetch } from "@hyper-fetch/react"
import { Button } from "@nextui-org/react"

import { getWishes } from "@my-wishlist/api/routes/wish"
import WishList from "@my-wishlist/ui/wish/WishList"

const Home = () => {
  const { data } = useFetch(getWishes)

  if (!data) {
    return <Button>nothin</Button>
  }

  return <WishList wishes={data.result} />
}

export default Home
