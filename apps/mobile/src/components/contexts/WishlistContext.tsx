import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import { useClient } from "@my-wishlist/react"
import type { Wish } from "@my-wishlist/types"

import { useSession } from "@/components/contexts/SessionContext"
import { useProtectedQuery } from "@/hooks/use-query"

type Context = {
  wishlist: Wish[]
  removeWish: (id: number) => void
  addWish: (wish: Wish) => void
  getWish: (id: number) => Wish | undefined
  editWish: (wish: Wish) => void
  selectedWish: Wish | null
  selectWish: (wishId: Wish["id"]) => void
  isLoading: boolean
}

const WishlistContext = createContext<Context>({} as Context)
export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const [wishlist, setWishlist] = useState<Wish[]>([])
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)

  const selectWish = useCallback(
    (wishId: Wish["id"]) => {
      setSelectedWish(wishlist.find((wish) => wish.id === wishId) ?? null)
    },
    [wishlist],
  )

  const { client } = useClient()
  const { data, isPending } = useProtectedQuery(() => client.wish.$get(), {
    queryKey: ["wishlist"],
    enabled: Boolean(session) && wishlist.length === 0,
  })

  const removeWish = useCallback((id: number) => {
    setWishlist((prev) => prev.filter((wish) => wish.id !== id))
  }, [])

  const addWish = useCallback((wish: Wish) => {
    setWishlist((prev) => [...prev, wish])
  }, [])

  const editWish = useCallback((wish: Wish) => {
    setWishlist((prev) => prev.map((w) => (w.id === wish.id ? wish : w)))
  }, [])

  const getWish = useCallback(
    (id: number) => wishlist.find((wish) => wish.id === id),
    [wishlist],
  )

  useEffect(() => {
    if (data) {
      setWishlist(data.result)
    }
  }, [data])

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        removeWish,
        addWish,
        getWish,
        editWish,
        selectWish,
        selectedWish,
        isLoading: isPending,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
