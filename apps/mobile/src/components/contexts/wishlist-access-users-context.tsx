import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import type { UserShared } from "@my-wishlist/types"

import useClient from "@/hooks/use-client"
import { useProtectedQuery } from "@/hooks/use-query"

type Context = {
  wishlistAccessUsers: UserShared[]
  isLoading: boolean
  selectedUser: UserShared | null
  setSelectedUser: Dispatch<SetStateAction<UserShared | null>>
  removeUser: (userId: number) => void
  addUser: (user: UserShared) => void
}

const WishlistAccessUsersContext = createContext<Context>({} as Context)
export const useWishlistAccessUsers = () =>
  useContext(WishlistAccessUsersContext)

export const WishlistAccessUsersProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [wishlistAccessUsers, setWishlistAccessUsers] = useState<UserShared[]>(
    [],
  )
  const [selectedUser, setSelectedUser] = useState<UserShared | null>(null)

  const client = useClient()
  const { data, isPending } = useProtectedQuery(
    () => client.share.users.$get(),
    {
      queryKey: ["shared"],
      enabled: wishlistAccessUsers.length === 0,
    },
  )

  useEffect(() => {
    if (data) {
      setWishlistAccessUsers(data.result)
    }
  }, [data])

  const removeUser = useCallback(
    (userId: number) => {
      setWishlistAccessUsers((prev) =>
        prev.filter((user) => user.id !== userId),
      )
    },
    [setWishlistAccessUsers],
  )

  const addUser = useCallback((user: UserShared) => {
    setWishlistAccessUsers((prev) => [...prev, user])
  }, [])

  return (
    <WishlistAccessUsersContext.Provider
      value={{
        wishlistAccessUsers,
        isLoading: isPending,
        selectedUser,
        setSelectedUser,
        removeUser,
        addUser,
      }}
    >
      {children}
    </WishlistAccessUsersContext.Provider>
  )
}
