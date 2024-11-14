import * as SecureStore from "expo-secure-store"
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import config from "@/utils/config"

type Context = {
  session: string | null
  signIn: (response: string) => Promise<void>
  signOut: () => Promise<void>
  isLoading: boolean
}

const SessionContext = createContext<Context>({} as Context)
export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Context["session"]>(null)
  const [isLoading, setIsLoading] = useState(true)

  const signIn = useCallback(async (response: string) => {
    await SecureStore.setItemAsync(config.store.session, response)
    setSession(response)
  }, [])

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(config.store.session)
    setSession(null)
  }, [])

  useEffect(() => {
    void (async () => {
      const token = await SecureStore.getItemAsync(config.store.session)

      if (token) {
        setSession(token)
      }

      setIsLoading(false)
    })()
  }, [])

  return (
    <SessionContext.Provider value={{ session, signIn, signOut, isLoading }}>
      {children}
    </SessionContext.Provider>
  )
}
