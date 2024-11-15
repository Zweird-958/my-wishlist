"use client"

import { useEffect, useMemo, useState } from "react"

import config, { type Filter, type Sort } from "@my-wishlist/config"
import { useClient } from "@my-wishlist/react"

import { useProtectedQuery } from "../../hooks/use-query"
import useHandleError from "../../hooks/useHandleError"
import { useRouter, useTranslation } from "../AppContext"
import WishlistDisplay from "../wishlist/WishlistDisplay"

type Props = {
  userId: string
}

const WishlistShared = ({ userId }: Props) => {
  const { t } = useTranslation("errors")
  const router = useRouter()
  const { handleError } = useHandleError(
    { 401: t("notAuthorized") },
    { 401: () => void router.push("/share") },
  )
  const { client } = useClient()
  const { data, error, isLoading } = useProtectedQuery(
    () => client.share.wish[":userId"].$get({ param: { userId } }),
    {
      queryKey: ["shared", userId],
    },
  )

  const [selectedFilter, setSelectedFilter] = useState<Filter>(
    config.defaultFilter,
  )
  const [selectedSort, setSelectedSort] = useState<Sort>(config.defaultSort)
  const wishlist = useMemo(() => data?.result ?? [], [data])

  useEffect(() => {
    if (error) {
      handleError(error)
    }
  }, [error, handleError])

  return (
    <WishlistDisplay
      isLoading={isLoading || (!data && !error)}
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
