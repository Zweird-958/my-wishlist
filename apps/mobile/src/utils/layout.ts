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
  {
    label: "sharedWishlist",
    href: "/wish/shared",
    name: "wish/shared",
  },
]

export const ROUTES: Route[] = [
  {
    label: "editWish",
    name: "wish/[wishId]",
  },
  {
    label: "createWish",
    name: "wish/create",
  },
]

export const ROUTES_WITHOUT_DRAWER: Route[] = [
  {
    label: "signIn",
    name: "sign-in",
  },
  {
    label: "signUp",
    name: "sign-up",
  },
]
