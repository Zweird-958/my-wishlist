import * as SecureStore from "expo-secure-store"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import config from "@/utils/config"

type Context = {
  session: string | null
  signIn: (response: string) => Promise<void>
}

export const SessionContext = createContext<Context>({} as Context)
export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Context["session"]>(null)

  const signIn = async (response: string) => {
    await SecureStore.setItemAsync(config.store.session, response)
    setSession(response)
  }

  useEffect(() => {
    void (async () => {
      const token = await SecureStore.getItemAsync(config.store.session)

      if (token) {
        setSession(token)
      }
    })()
  }, [])

  return (
    <SessionContext.Provider value={{ session, signIn }}>
      {children}
    </SessionContext.Provider>
  )
}