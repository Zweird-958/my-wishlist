import type { JwtPayload } from "./api"

export type SessionContext = {
  session: JwtPayload | null
  token: string | null
  isLoading: boolean
  signIn: (response: string) => void | Promise<void>
  signOut: () => void | Promise<void>
}
