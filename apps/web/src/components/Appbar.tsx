"use client"

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"

import SelectTheme from "@/components/SelectTheme"

const Appbar = () => (
  <Navbar maxWidth="full">
    <NavbarBrand as={Link} href="/">
      My Wishlist
    </NavbarBrand>
    <NavbarContent justify="end">
      <SelectTheme />
    </NavbarContent>
  </Navbar>
)

export default Appbar
