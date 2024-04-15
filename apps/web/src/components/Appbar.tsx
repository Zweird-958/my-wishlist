"use client"

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { useState } from "react"

import { useTranslation } from "@/app/i18n/client"
import SelectLocale from "@/components/SelectLocale"
import SelectTheme from "@/components/SelectTheme"
import useSession from "@/hooks/useSession"

const Appbar = () => {
  const { session, signOut } = useSession()
  const { t } = useTranslation("common")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { label: t("home"), href: "/" },
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
          <Link href="/" color="foreground">
            My Wishlist
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <NavbarItem className="hidden sm:flex">
            <Button onClick={signOut} color="danger">
              {t("signOut")}
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex">
            <Button
              as={Link}
              href="/sign-in"
              className="text-white"
              color="success"
            >
              {t("signIn")}
            </Button>
          </NavbarItem>
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
                  color="foreground"
                  href={href ?? ""}
                  onPress={() => setIsMenuOpen(false)}
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
