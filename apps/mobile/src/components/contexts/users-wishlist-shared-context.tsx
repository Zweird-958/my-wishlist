import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { UserShared } from "@my-wishlist/types"

import useClient from "@/hooks/use-client"
import { useProtectedQuery } from "@/hooks/use-query"

type Context = {
  usersWishlistShared: UserShared[]
  isLoading: boolean
}

const UsersWishlistSharedContext = createContext<Context>({} as Context)
export const useUsersWishlistShared = () =>
  useContext(UsersWishlistSharedContext)

export const UsersWishlistSharedProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [usersWishlistShared, setUsersWishlistShared] = useState<UserShared[]>(
    [],
  )
  const client = useClient()
  const { data, isPending } = useProtectedQuery(
    () => client.share.wish.$get(),
    {
      queryKey: ["usersWishlistShared"],
      enabled: usersWishlistShared.length === 0,
    },
  )

  useEffect(() => {
    if (data) {
      setUsersWishlistShared(data.result)
    }
  }, [data])

  return (
    <UsersWishlistSharedContext.Provider
      value={{ usersWishlistShared, isLoading: isPending }}
    >
      {children}
    </UsersWishlistSharedContext.Provider>
  )
}
