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

const SessionContext = createContext<SessionContext>({} as SessionContext)

export const useSession = () => useContext(SessionContext)

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<JwtPayload | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const signIn = (response: string) => {
    const jwt = response

    localStorage.setItem(config.localStorageSessionKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setToken(jwt)
    setSession(payload)
  }
  const signOut = () => {
    localStorage.removeItem(config.localStorageSessionKey)
    setSession(null)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.localStorageSessionKey)

    if (!jwt) {
      setIsLoading(false)

      return
    }

    try {
      const { payload } = jsonwebtoken.decode(jwt) as RawJwt

      setToken(jwt)
      setSession(payload)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setSession, setToken])

  return (
    <SessionContext.Provider
      value={{ session, token, isLoading, signIn, signOut }}
    >
      {children}
    </SessionContext.Provider>
  )
}
