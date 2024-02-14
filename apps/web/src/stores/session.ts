import { create } from "zustand"

import { JwtPayload } from "@my-wishlist/types/Api"

type SessionStore = {
  session: JwtPayload | null
  setSession: (session: JwtPayload | null) => void
}
const useSessionStore = create<SessionStore>((set) => ({
  session: null,
  setSession: (session: JwtPayload | null) => set({ session }),
}))

export default useSessionStore
