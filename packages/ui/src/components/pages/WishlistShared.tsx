"use client"

import { useFetch } from "@hyper-fetch/react"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { getWishlistSharedUser } from "@my-wishlist/api/routes/sharedWishes"
import config, { Filter, Sort } from "@my-wishlist/config"

import useHandleError from "../../hooks/useHandleError"
import { useTranslation } from "../AppContext"
import WishlistDisplay from "../wishlist/WishlistDisplay"

const WishlistShared = () => {
  const { t } = useTranslation("errors")
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()
  const { data, onFinished, loading, error } = useFetch(
    getWishlistSharedUser.setParams({ userId }),
  )
  const { handleError } = useHandleError<typeof getWishlistSharedUser>(
    { 401: t("notAuthorized") },
    { 401: () => router.push("/share") },
  )
  const [selectedFilter, setSelectedFilter] = useState<Filter>(
    config.defaultFilter,
  )
  const [selectedSort, setSelectedSort] = useState<Sort>(config.defaultSort)
  const wishlist = useMemo(() => data?.result ?? [], [data])

  onFinished((result) => {
    handleError(result)
  })

  return (
    <WishlistDisplay
      isLoading={loading || (!data && !error)}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      wishlist={wishlist}
      username={data?.meta.username}
    />
  )
}

export default WishlistShared
