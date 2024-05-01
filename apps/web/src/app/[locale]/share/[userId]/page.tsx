"use client"

import { useFetch } from "@hyper-fetch/react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"

import { getWishlistSharedUser } from "@my-wishlist/api/routes/sharedWishes"

import { useTranslation } from "@/app/i18n/client"
import WishList from "@/components/wishlist/WishList"
import WishlistOptions from "@/components/wishlist/WishlistOptions"
import useHandleError from "@/hooks/useHandleError"
import config, { Filter, Sort } from "@/utils/config"
import filterWishlist from "@/utils/filterWishlist"

const Page = () => {
  const { t } = useTranslation("errors")
  const router = useRouter()
  const { userId } = useParams<{ userId: string }>()
  const { data, onFinished } = useFetch(
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

  onFinished((result) => {
    handleError(result)
  })

  return (
    <div className="flex flex-col gap-4 max-w-wish mx-auto">
      <WishlistOptions
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      <WishList
        wishes={filterWishlist(
          data?.result ?? [],
          selectedFilter,
          selectedSort,
        )}
      />
    </div>
  )
}

export default Page
