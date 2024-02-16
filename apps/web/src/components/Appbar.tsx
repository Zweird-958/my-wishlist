"use client"

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"

import SelectLocale from "@/components/SelectLocale"
import SelectTheme from "@/components/SelectTheme"

const Appbar = () => (
  <Navbar maxWidth="2xl">
    <NavbarBrand as={Link} href="/">
      My Wishlist
    </NavbarBrand>
    <NavbarContent justify="end">
      <SelectTheme />
      <SelectLocale />
    </NavbarContent>
  </Navbar>
)

export default Appbar
