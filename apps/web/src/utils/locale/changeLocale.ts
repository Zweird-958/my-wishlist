"use server"

import { cookies } from "next/headers"

import { type Locale } from "@my-wishlist/config"

import config from "@/utils/config"

const changeLocale = (language: Locale) => {
  const cookiesStore = cookies()
  cookiesStore.set(config.cookieLanguageKey, language)
}

export default changeLocale
