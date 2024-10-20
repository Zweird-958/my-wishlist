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

import { useSession, useTranslation } from "../components/AppContext"
import SelectLocale from "./SelectLocale"
import SelectTheme from "./SelectTheme"

// eslint-disable-next-line no-console
console.log(
  (process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV) === "production",
)

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
