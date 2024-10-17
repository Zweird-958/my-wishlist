import type { Href } from "expo-router"

type DrawerItem = {
  label: string
  href: Href<string>
  name: string
}

type Route = {
  label: string
  name: string
}

export const DRAWER_ITEMS: DrawerItem[] = [
  {
    label: "home",
    href: "/",
    name: "index",
  },
]

export const ROUTES: Route[] = [
  {
    label: "home",
    name: "index",
  },
  {
    label: "signIn",
    name: "sign-in",
  },
  {
    label: "signUp",
    name: "sign-up",
  },
  {
    label: "editWish",
    name: "wish/[wishId]",
  },
  {
    label: "createWish",
    name: "wish/create",
  },
]
