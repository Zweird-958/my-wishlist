"use client"

import { ReactNode, createContext, useContext } from "react"

import config, { Locale } from "@my-wishlist/config"

type Props = {
  children: ReactNode
  locale: Locale
}

const LocaleContext = createContext<{ locale: Locale }>({
  locale: config.defaultLanguage,
})
export const LocaleProvider = (props: Props) => {
  const { locale, ...otherProps } = props

  return <LocaleContext.Provider value={{ locale }} {...otherProps} />
}
export const useLocale = () => useContext(LocaleContext).locale
