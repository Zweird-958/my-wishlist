"use client"

import { Button, type ButtonProps } from "@ui/components/ui/button"
import { Plus } from "lucide-react"

type Props = Pick<Required<ButtonProps>, "onClick"> & Pick<ButtonProps, "color">

const AddButton = ({ onClick, color }: Props) => (
  <Button
    className="fixed bottom-6 right-6 z-20"
    color={color}
    onClick={onClick}
    size="icon"
  >
    <Plus />
  </Button>
)

export default AddButton
