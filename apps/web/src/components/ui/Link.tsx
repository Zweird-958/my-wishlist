"use client"

import NextLink, { LinkProps } from "next/link"
import { useParams } from "next/navigation"
import { AnchorHTMLAttributes, ReactNode } from "react"

import { Locale } from "@my-wishlist/config"

type Props = {
  children: ReactNode
  className?: string
} & LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">

const Link = ({ href, ...props }: Props) => {
  const { locale } = useParams<{ locale: Locale }>()
  const hrefParsed =
    typeof href !== "string"
      ? { ...href, pathname: `/${locale}${href.pathname}` }
      : `/${locale}${href}`

  return <NextLink href={hrefParsed} {...props} />
}

export default Link
