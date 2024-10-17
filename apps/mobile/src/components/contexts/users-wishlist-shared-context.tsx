import { useQuery } from "@tanstack/react-query"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { UserShared } from "@my-wishlist/types"

import api from "@/utils/api"

type Context = {
  usersWishlistShared: UserShared[]
  isLoading: boolean
}

export const UsersWishlistSharedContext = createContext<Context>({} as Context)
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

  const { data, isPending } = useQuery({
    queryKey: ["usersWishlistShared"],
    queryFn: () => api.get<UserShared[]>("/share/users"),
    enabled: usersWishlistShared.length === 0,
    select: ({ result }) => result,
  })

  useEffect(() => {
    if (data) {
      setUsersWishlistShared(data)
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
