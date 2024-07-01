import { ReactNode, createContext, useContext } from "react"

import { Namespace } from "@my-wishlist/i18n"
import { UseTranslation } from "@my-wishlist/i18n/utils"
import { JwtPayload } from "@my-wishlist/types/Api"

type Context = {
  useTranslation: (...ns: Namespace[]) => UseTranslation
  useSession: () => {
    session: JwtPayload | null
    isLoading: boolean
    signIn: (response: string) => void
    signOut: () => void
  }
}

type Props = {
  children: ReactNode
} & Context

const AppContext = createContext<Context>({} as Context)

export const useAppContext = () => useContext(AppContext)
export const useSession = () => useAppContext().useSession()
export const useTranslation = (...ns: Namespace[]) =>
  useAppContext().useTranslation(...ns)
export const AppProvider = ({ children, ...props }: Props) => (
  <AppContext.Provider value={{ ...props }}>{children}</AppContext.Provider>
)
