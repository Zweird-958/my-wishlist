"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { Button } from "@ui/components/ui/button"
import { Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { useSession, useTranslation } from "../components/AppContext"
import SelectLocale from "./SelectLocale"
import SelectTheme from "./SelectTheme"

const Appbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, locale, changeLanguage } = useTranslation()
  const { session, signOut } = useSession()
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
              <Button asChild className="p-2" variant="outline" size="icon">
                <Link href="/share">
                  <Share2 />
                </Link>
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button color="success">
                <Link href="/sign-in">{t("signIn")}</Link>
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button asChild variant="outline" color="primary">
                <Link href="/sign-up">{t("signUp")}</Link>
              </Button>
            </NavbarItem>
          </>
        )}
        <SelectTheme />
        <SelectLocale locale={locale} changeLocale={changeLanguage} />
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(
          ({ label, href, onClick, hidden }) =>
            !hidden && (
              <NavbarMenuItem key={href ?? label}>
                {!href ? (
                  <button onClick={onClick}>{label}</button>
                ) : (
                  <Link
                    className="text-foreground"
                    href={href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                )}
              </NavbarMenuItem>
            ),
        )}
      </NavbarMenu>
    </Navbar>
  )
}

export default Appbar
