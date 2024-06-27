"use client"

import { Switch, SwitchProps } from "@nextui-org/react"

type Props = {
  label: string
} & Pick<SwitchProps, "onValueChange" | "isSelected">

const SwitchField = ({ onValueChange, isSelected, label }: Props) => (
  <div className="flex justify-between w-full items-center">
    <label>{label}</label>
    <Switch onValueChange={onValueChange} isSelected={isSelected} />
  </div>
)

export default SwitchField
