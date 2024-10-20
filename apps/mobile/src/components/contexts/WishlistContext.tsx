import { useQuery } from "@tanstack/react-query"
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import type { Wish } from "@my-wishlist/types"

import { useSession } from "@/components/contexts/SessionContext"
import api from "@/utils/api"

type Context = {
  wishlist: Wish[]
  removeWish: (id: number) => void
  addWish: (wish: Wish) => void
  getWish: (id: number) => Wish | undefined
  editWish: (wish: Wish) => void
  selectedWish: Wish | null
  selectWish: (wishId: Wish["id"]) => void
}

export const WishlistContext = createContext<Context>({} as Context)
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

  const { data } = useQuery({
    queryKey: [session, "wishlist"],
    queryFn: () => api.get<Wish[]>("/wish"),
    enabled: Boolean(session) && wishlist.length === 0,
    select: ({ result }) => result,
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
      setWishlist(data)
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
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
