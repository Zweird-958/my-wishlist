"use client"

import {
  type MutableRefObject,
  type ReactNode,
  createContext,
  useContext,
} from "react"

type NavbarContextType = {
  navbarHeight: MutableRefObject<number>
}

export const NavbarContext = createContext<NavbarContextType>(
  {} as NavbarContextType,
)

type NavbarProps = NavbarContextType & { children: ReactNode }

export const NavbarProvider = ({ children, ...props }: NavbarProps) => (
  <NavbarContext.Provider value={{ ...props }}>
    {children}
  </NavbarContext.Provider>
)

export const useNavbarContext = () => useContext(NavbarContext)

type NavbarMenuContextType = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export const NavbarMenuContext = createContext<NavbarMenuContextType>(
  {} as NavbarMenuContextType,
)

type NavbarMenuProps = NavbarMenuContextType & { children: ReactNode }

export const NavbarMenuProvider = ({
  children,
  isOpen,
  ...props
}: NavbarMenuProps) => (
  <NavbarMenuContext.Provider value={{ isOpen, ...props }}>
    {children}
  </NavbarMenuContext.Provider>
)

export const useNavbarMenuContext = () => useContext(NavbarMenuContext)
