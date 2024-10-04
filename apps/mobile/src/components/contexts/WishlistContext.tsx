import { useQuery } from "@tanstack/react-query"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { Wish } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "@/components/contexts/SessionContext"

type Context = {
  wishlist: Wish[]
}

export const WishlistContext = createContext<Context>({} as Context)
export const useWishlist = () => useContext(WishlistContext)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useSession()
  const [wishlist, setWishlist] = useState<Wish[]>([])

  const { data } = useQuery({
    queryKey: [session, "wishlist"],
    queryFn: () =>
      api.get<Wish[]>("/wish", null, { headers: { Authorization: session } }),
    enabled: Boolean(session) && wishlist.length === 0,
    select: ({ result }) => result,
  })

  useEffect(() => {
    if (data) {
      setWishlist(data)
    }
  }, [data])

  return (
    <WishlistContext.Provider value={{ wishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
