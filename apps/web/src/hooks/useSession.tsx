"use client"

import jsonwebtoken from "jsonwebtoken"
import { useEffect } from "react"

import type { RawJwt } from "@my-wishlist/types"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { setSession, setIsLoading, setToken, ...sessionStore } =
    useSessionStore()
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

  return { signIn, signOut, ...sessionStore }
}

export default useSession
