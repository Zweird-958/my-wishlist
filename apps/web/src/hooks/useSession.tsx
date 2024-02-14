import jsonwebtoken from "jsonwebtoken"
import { useEffect } from "react"

import { RawJwt } from "@my-wishlist/types/Api"

import useSessionStore from "@/stores/session"
import config from "@/utils/config"

const useSession = () => {
  const { setSession, ...sessionStore } = useSessionStore()
  const signIn = (response: string) => {
    const jwt = response

    localStorage.setItem(config.localStorageSessionKey, jwt)

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }
  const signOut = () => {
    localStorage.removeItem(config.localStorageSessionKey)
    setSession(null)
  }

  useEffect(() => {
    const jwt = localStorage.getItem(config.localStorageSessionKey)

    if (!jwt) {
      return
    }

    const { payload } = jsonwebtoken.decode(jwt) as RawJwt

    setSession(payload)
  }, [setSession])

  return { signIn, signOut, ...sessionStore }
}

export default useSession
