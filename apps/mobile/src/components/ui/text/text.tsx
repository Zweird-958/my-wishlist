import { forwardRef } from "react"
import { Text as RNText } from "react-native"

import useText, { type UseTextProps } from "@/components/ui/text/use-text"

export type TextProps = UseTextProps

const Text = forwardRef<RNText, TextProps>((props, ref) => {
  const { getProps } = useText({ ...props, ref })

  return <RNText {...getProps()} />
})

Text.displayName = "Text"

export default Text
