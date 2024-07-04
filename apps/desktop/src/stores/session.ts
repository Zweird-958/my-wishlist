import { create } from "zustand"

import { JwtPayload } from "@my-wishlist/types/Api"

type SessionStore = {
  session: JwtPayload | null
  setSession: (session: JwtPayload | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  token: string | null
  setToken: (token: string | null) => void
}
const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  token: null,
  setToken: (token) => set({ token }),
}))

export default useSessionStore
