"use client"

import jsonwebtoken from "jsonwebtoken"
import { useEffect } from "react"

import { RawJwt } from "@my-wishlist/types"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"
import store from "@/utils/store"

const useSession = () => {
  const { setSession, setIsLoading, setToken, ...sessionStore } =
    useSessionStore()
  const signIn = async (response: string) => {
    const jwt = response

    await store.set(config.store.sessionKey, jwt)
    await store.save()

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setToken(jwt)
    setSession(payload)
  }
  const signOut = async () => {
    await store.delete(config.store.sessionKey)
    await store.save()

    setSession(null)
  }

  useEffect(() => {
    ;(async () => {
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

  return { signIn, signOut, ...sessionStore }
}

export default useSession
