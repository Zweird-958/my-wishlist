"use client"

import { useEffect } from "react"

import { UserShared } from "@my-wishlist/types"

import useUsersSharedStore from "../stores/usersShared"
import useQuery from "./useQuery"

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
