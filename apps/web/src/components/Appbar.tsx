"use client"

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Link from "next/link"

import SelectLocale from "@/components/SelectLocale"
import SelectTheme from "@/components/SelectTheme"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"

const Appbar = () => {
  const { session, signOut } = useSession()
  const {
    translations: { common },
  } = useLocale()

  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand as={Link} href="/">
        My Wishlist
      </NavbarBrand>
      <NavbarContent justify="end">
        {session ? (
          <NavbarItem>
            <Button onClick={signOut} color="danger">
              {common.signOut}
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
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
    </Navbar>
  )
}

export default Appbar
