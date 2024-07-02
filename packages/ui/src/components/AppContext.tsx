import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { NextRouter } from "next/router"
import { ReactNode, createContext, useContext } from "react"

import { Namespace } from "@my-wishlist/i18n/config"
import type {
  UseTranslationDesktop,
  UseTranslationWeb,
} from "@my-wishlist/i18n/types"
import { JwtPayload } from "@my-wishlist/types/Api"

type Context = {
  useTranslation: (
    ...ns: Namespace[]
  ) => UseTranslationWeb | UseTranslationDesktop
  useSession: () => {
    session: JwtPayload | null
    isLoading: boolean
    signIn: (response: string) => void
    signOut: () => void
  }
  useRouter: () => NextRouter | AppRouterInstance
}

type Props = {
  children: ReactNode
} & Context

const AppContext = createContext<Context>({} as Context)

export const useAppContext = () => useContext(AppContext)
export const useSession = () => useAppContext().useSession()
export const useTranslation = (...ns: Namespace[]) =>
  useAppContext().useTranslation(...ns)
export const useRouter = () => useAppContext().useRouter()
export const AppProvider = ({ children, ...props }: Props) => (
  <AppContext.Provider value={{ ...props }}>{children}</AppContext.Provider>
)
