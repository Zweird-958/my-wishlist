"use client"

import i18next from "i18next"
import { ReactNode, useMemo } from "react"
import { I18nextProvider as Provider } from "react-i18next"

import { Locale } from "./config"

export const I18nProvider = ({
  children,
  language,
}: {
  children: ReactNode
  language: Locale
}) => {
  useMemo(() => {
    i18next.changeLanguage(language)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Provider i18n={i18next}>{children}</Provider>
}
