import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import type { NextRouter } from "next/router"
import { type ReactNode, createContext, useContext } from "react"

import type {
  Namespace,
  UseTranslationDesktop,
  UseTranslationWeb,
} from "@my-wishlist/i18n/config"
import type { JwtPayload } from "@my-wishlist/types"

type Context = {
  useTranslation: (
    ...ns: Namespace[]
  ) => UseTranslationWeb | UseTranslationDesktop
  useSession: () => {
    session: JwtPayload | null
    isLoading: boolean
    signIn: (response: string) => void
    signOut: () => void
    token: string | null
  }
  useRouter: () => NextRouter | AppRouterInstance
}

type Props = {
  children: ReactNode
} & Context

const AppContext = createContext<Context>({} as Context)

export const useAppContext = () => useContext(AppContext)
export const useSession = () => useAppContext().useSession()
export const useTranslation: (
  ...ns: Namespace[]
) => UseTranslationWeb | UseTranslationDesktop = (...ns) =>
  useAppContext().useTranslation(...ns)
export const useRouter = () => useAppContext().useRouter()
export const AppProvider = ({ children, ...props }: Props) => (
  <AppContext.Provider value={{ ...props }}>{children}</AppContext.Provider>
)
