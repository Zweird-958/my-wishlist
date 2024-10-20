"use client"

import jsonwebtoken from "jsonwebtoken"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import type { JwtPayload, RawJwt, SessionContext } from "@my-wishlist/types"

import config from "@/utils/config"
import getStore from "@/utils/get-store"

const SessionContext = createContext<SessionContext>({} as SessionContext)

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<JwtPayload | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const signIn = async (response: string) => {
    const jwt = response
    const store = await getStore()

    await store.set(config.store.sessionKey, jwt)
    await store.save()

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setToken(jwt)
    setSession(payload)
  }
  const signOut = async () => {
    const store = await getStore()

    await store.delete(config.store.sessionKey)
    await store.save()

    setSession(null)
  }

  useEffect(() => {
    void (async () => {
      const store = await getStore()
      const jwt = await store.get<string | null>(config.store.sessionKey)

      if (!jwt) {
        setIsLoading(false)

        return
      }

      const { payload } = jsonwebtoken.decode(jwt) as RawJwt

      setToken(jwt)
      setSession(payload)
      setIsLoading(false)
    })()
  }, [setIsLoading, setSession, setToken])

  return (
    <SessionContext.Provider
      value={{ session, token, isLoading, signIn, signOut }}
    >
      {children}
    </SessionContext.Provider>
  )
}
