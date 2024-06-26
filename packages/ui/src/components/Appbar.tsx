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

import { useTranslation } from "@my-wishlist/i18n/utils"
import { JwtPayload } from "@my-wishlist/types/Api"

import SelectLocale, { SelectLocaleProps } from "./SelectLocale"
import SelectTheme from "./SelectTheme"

type MenuItem = {
  label: string
  href?: string
  hidden?: boolean
  onClick?: () => void
}

type Props = {
  menuItems: MenuItem[]
  session: JwtPayload | null
  actions: {
    signOut: () => void
    changeLocale: SelectLocaleProps["changeLocale"]
  }
}

const Appbar = ({ menuItems, session, actions }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, locale } = useTranslation()

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
              <Button onClick={actions.signOut} color="danger">
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
        <SelectLocale locale={locale} changeLocale={actions.changeLocale} />
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
