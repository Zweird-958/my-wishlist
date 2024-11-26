"use client"

import { useEffect } from "react"

import { useClient } from "@my-wishlist/react"

import useUsersSharedStore from "../stores/usersShared"
import { useProtectedQuery } from "./use-query"

const useUsersShared = () => {
  const { usersShared, setUsersShared, ...usersSharedStore } =
    useUsersSharedStore()
  const { client } = useClient()
  const { data, isLoading, error } = useProtectedQuery(
    () => client.share.users.$get(),
    {
      queryKey: ["usersShared"],
      enabled: usersShared.length === 0,
    },
  )

  useEffect(() => {
    if (data?.result && usersShared.length === 0) {
      setUsersShared(data.result)
    }
  }, [usersShared.length, data?.result, setUsersShared])

  return {
    usersShared,
    isLoading: isLoading || (!data && !error),
    ...usersSharedStore,
  }
}

export default useUsersShared
