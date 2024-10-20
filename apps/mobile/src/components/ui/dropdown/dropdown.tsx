import type { ReactNode } from "react"

import {
  type DropdownContextProps,
  DropdownProvider,
} from "@/components/ui/dropdown/dropdown-context"

export type DropdownProps = { children: ReactNode } & Pick<
  DropdownContextProps,
  "onChange"
>
const DROPDOWN_GAP = 10

const Dropdown = (props: DropdownProps) => (
  <DropdownProvider gap={DROPDOWN_GAP} {...props} />
)

export default Dropdown
