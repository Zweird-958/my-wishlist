"use client"

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useTranslation } from "@my-wishlist/i18n"

import SelectLocale from "./SelectLocale"
import SelectTheme from "./SelectTheme"
import useSession from "./hooks/useSession"

const Appbar = () => {
  const { session, signOut } = useSession()
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { label: t("home"), href: "/" },
    { label: t("wishlistShared"), href: "/share", hidden: !session },
    { label: t("signIn"), href: "/sign-in", hidden: Boolean(session) },
    { label: t("signUp"), href: "/sign-up", hidden: Boolean(session) },
    { label: t("signOut"), onClick: signOut, hidden: !session },
  ]

  return (
    <Navbar
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="text-foreground">
            My Wishlist
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button onClick={signOut} color="danger">
                {t("signOut")}
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                href="/share"
                className="p-2"
                variant="bordered"
                isIconOnly
              >
                <Share2 />
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button as={Link} href="/sign-in" color="success">
                {t("signIn")}
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                href="/sign-up"
                variant="bordered"
                color="primary"
              >
                {t("signUp")}
              </Button>
            </NavbarItem>
          </>
        )}
        <SelectTheme />
        <SelectLocale />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ label, href, onClick, hidden }) => (
          <NavbarMenuItem key={href ?? label}>
            {!hidden &&
              (!href ? (
                <button onClick={onClick}>{label}</button>
              ) : (
                <Link
                  className="text-foreground"
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Appbar
