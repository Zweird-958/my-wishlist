"use client"

import { useFetch } from "@hyper-fetch/react"

import { getWishlistShared } from "@my-wishlist/api/routes/sharedWishes"

import UsersShared from "@/components/user/UsersShared"

const SharedPage = () => {
  const { data, loading, error } = useFetch(getWishlistShared)

  return (
    <UsersShared
      items={data?.result ?? []}
      isLink
      isLoading={loading || (!data && !error)}
    />
  )
}

export default SharedPage
