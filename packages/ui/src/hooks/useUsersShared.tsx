"use client"

import { useEffect } from "react"
import useQuery from "src/hooks/useQuery"

import { UserShared } from "@my-wishlist/types/User"

import useUsersSharedStore from "../stores/usersShared"

const useUsersShared = () => {
  const { usersShared, setUsersShared, ...usersSharedStore } =
    useUsersSharedStore()
  const { data, isLoading, error } = useQuery<UserShared[]>({
    method: "get",
    path: "/share/users",
    enabled: usersShared.length === 0,
    queryKey: ["usersShared"],
  })

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
