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

import SelectLocale from "@/components/SelectLocale"
import SelectTheme from "@/components/SelectTheme"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"

const Appbar = () => {
  const { session, signOut } = useSession()
  const {
    translations: { common },
  } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuItems = [
    { label: common.home, href: "/" },
    { label: common.signIn, href: "/sign-in", hidden: Boolean(session) },
    { label: common.signUp, href: "/sign-up", hidden: Boolean(session) },
    { label: common.signOut, onClick: signOut, hidden: !session },
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
              {common.signOut}
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
              {common.signIn}
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
