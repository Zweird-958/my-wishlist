/* eslint-disable max-lines */
import * as Dialog from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import {
  NavbarMenuProvider,
  NavbarProvider,
  useNavbarContext,
  useNavbarMenuContext,
} from "@ui/components/ui/navbar/context"
import MenuIcon from "@ui/components/ui/navbar/menu-icon"
import { menuVariants, navbarVariants } from "@ui/components/ui/navbar/theme"
import useDOMRef from "@ui/hooks/use-dom-ref"
import { AnimatePresence, motion } from "framer-motion"
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { RemoveScroll } from "react-remove-scroll"

export type NavbarProps = ComponentPropsWithoutRef<"nav">

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ children, style, className, ...props }, ref) => {
    const navRef = useDOMRef(ref)
    const navHeight = useRef(0)

    useEffect(() => {
      navHeight.current = navRef.current?.offsetHeight ?? 0
    }, [navRef])

    return (
      <NavbarProvider navbarHeight={navHeight}>
        <nav
          className={navbarVariants().base({ className })}
          ref={navRef}
          style={
            {
              "--navbar-height": `${navHeight.current}px`,
              ...style,
            } as React.CSSProperties
          }
          {...props}
        >
          {children}
        </nav>
      </NavbarProvider>
    )
  },
)
Navbar.displayName = "Navbar"

export type NavbarContentProps = ComponentPropsWithoutRef<"ul">

export const NavbarContent = forwardRef<HTMLUListElement, NavbarContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={navbarVariants().content({ className })}
      {...props}
    />
  ),
)
NavbarContent.displayName = "NavbarContent"

export type NavbarItem = ComponentPropsWithoutRef<"li">

export const NavbarItem = forwardRef<HTMLLIElement, NavbarItem>(
  (props, ref) => <li ref={ref} {...props} />,
)

export type NavbarMenuProps = Omit<
  ComponentProps<typeof Dialog.Root>,
  "onOpenChange"
> & { onOpenChange?: (open: boolean) => void }

export const NavbarMenu = ({
  children,
  open,
  onOpenChange,
  ...props
}: NavbarMenuProps) => {
  const [initialIsOpen, initialSetIsOpen] = useState(false)
  const isOpen = useMemo(() => open ?? initialIsOpen, [initialIsOpen, open])
  const setIsOpen = useMemo(
    () => onOpenChange ?? initialSetIsOpen,
    [onOpenChange],
  )

  return (
    <NavbarMenuProvider isOpen={isOpen} setIsOpen={setIsOpen}>
      <Dialog.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        modal={false}
        {...props}
      >
        {children}
      </Dialog.Root>
    </NavbarMenuProvider>
  )
}

NavbarMenu.displayName = "NavbarMenu"

export const NavbarMenuItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ children, className, ...props }, ref) => (
  <Dialog.Close asChild>
    <li
      className={navbarVariants().menuItem({ className })}
      ref={ref}
      {...props}
    >
      {children}
    </li>
  </Dialog.Close>
))
NavbarMenuItem.displayName = "NavbarMenuItem"

export type NavbarMenuTriggerProps = ComponentPropsWithoutRef<
  typeof Dialog.Trigger
>

export const NavbarMenuTrigger = forwardRef<
  ElementRef<typeof Dialog.Trigger>,
  NavbarMenuTriggerProps
>(({ className, children, ...props }, ref) => (
  <li>
    <Dialog.Trigger
      ref={ref}
      className={navbarVariants().menuTrigger({ className })}
      {...props}
    >
      {children ?? <MenuIcon />}
    </Dialog.Trigger>
  </li>
))
NavbarMenuItem.displayName = "NavbarMenuTrigger"

export type NavbarMenuContentProps = ComponentPropsWithoutRef<
  typeof Dialog.Content
>

export const NavbarMenuContent = forwardRef<
  HTMLUListElement,
  NavbarMenuContentProps
>(({ className, children, style, onInteractOutside, ...props }, ref) => {
  const { isOpen } = useNavbarMenuContext()
  const { navbarHeight } = useNavbarContext()

  const handleOnInteractOutside: NavbarMenuContentProps["onInteractOutside"] = (
    event,
  ) => {
    if (onInteractOutside) {
      onInteractOutside(event)

      return
    }

    event.preventDefault()
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <Dialog.Portal forceMount>
          <RemoveScroll>
            <Dialog.Content
              asChild
              forceMount
              style={
                {
                  "--navbar-height": `${navbarHeight.current}px`,
                  ...style,
                } as React.CSSProperties
              }
              onInteractOutside={handleOnInteractOutside}
              {...props}
            >
              <motion.ul
                animate="enter"
                initial="exit"
                exit="exit"
                layoutScroll
                variants={menuVariants}
                className={navbarVariants().menu({
                  className,
                })}
                ref={ref}
              >
                <VisuallyHidden>
                  <Dialog.Title>Navbar</Dialog.Title>
                  <Dialog.Description>Navbar menu opened</Dialog.Description>
                </VisuallyHidden>
                {children}
              </motion.ul>
            </Dialog.Content>
          </RemoveScroll>
        </Dialog.Portal>
      ) : null}
    </AnimatePresence>
  )
})
NavbarMenuContent.displayName = "NavbarMenuContent"
