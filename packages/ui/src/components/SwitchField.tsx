"use client"

import { Switch, type SwitchProps } from "@nextui-org/react"

type Props = {
  label: string
} & Pick<SwitchProps, "onValueChange" | "isSelected">

const SwitchField = ({ onValueChange, isSelected, label }: Props) => (
  <div className="flex w-full items-center justify-between">
    <label>{label}</label>
    <Switch onValueChange={onValueChange} isSelected={isSelected} />
  </div>
)

export default SwitchField
