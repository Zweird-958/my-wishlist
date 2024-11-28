import {
  type DropdownMenuVariantsProps,
  dropdownMenuVariants,
} from "@ui/components/ui/dropdown-menu/theme"
import { type ReactNode, createContext, useContext, useMemo } from "react"

type DropdownMenuContextType = {
  slots: ReturnType<typeof dropdownMenuVariants>
} & Pick<DropdownMenuVariantsProps, "color">

export const DropdownMenuContext = createContext<DropdownMenuContextType>(
  {} as DropdownMenuContextType,
)

type DropdownMenuProps = {
  children: ReactNode
} & DropdownMenuVariantsProps

export const DropdownMenuProvider = ({
  children,
  color = "default",
  inset,
  variant,
}: DropdownMenuProps) => {
  const slots = useMemo(
    () => dropdownMenuVariants({ color, inset, variant }),
    [color, inset, variant],
  )

  return (
    <DropdownMenuContext.Provider value={{ slots, color }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

export const useDropdownMenuContext = () => useContext(DropdownMenuContext)
