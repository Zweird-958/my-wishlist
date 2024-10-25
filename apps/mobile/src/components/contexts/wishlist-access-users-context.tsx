import { useQuery } from "@tanstack/react-query"
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

import api from "@/utils/api"

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

  const { data, isPending } = useQuery({
    queryFn: () => api.get<UserShared[]>("/share/users"),
    queryKey: ["shared"],
    enabled: wishlistAccessUsers.length === 0,
    select: ({ result }) => result,
  })

  useEffect(() => {
    if (data) {
      setWishlistAccessUsers(data)
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
