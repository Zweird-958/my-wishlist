import type { Href } from "expo-router"

export type FunctionName = "signOut"

type DrawerItem = {
  label: string
  name: string
} & (
  | { href: Href<string>; functionName?: never }
  | { functionName: FunctionName; href?: never }
)

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
  {
    label: "settings",
    href: "/settings",
    name: "settings",
  },
  {
    label: "signOut",
    functionName: "signOut",
    name: "sign-out",
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
