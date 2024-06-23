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

import { JwtPayload } from "@my-wishlist/types/Api"

import SelectLocale, { SelectLocaleProps } from "./SelectLocale"
import SelectTheme, { SelectThemeProps } from "./SelectTheme"

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
  translations: {
    signOut: string
    signIn: string
    signUp: string
  }
} & Pick<SelectLocaleProps, "locale"> &
  Pick<SelectThemeProps, "translations">

const Appbar = ({
  menuItems,
  session,
  actions,
  translations: { signIn, signUp, signOut, ...translations },
  locale,
}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                {signOut}
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
                {signIn}
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                href="/sign-up"
                variant="bordered"
                color="primary"
              >
                {signUp}
              </Button>
            </NavbarItem>
          </>
        )}
        <SelectTheme translations={translations} />
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
