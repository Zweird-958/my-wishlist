/* eslint-disable max-lines */
import { type VariantProps, cva } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  useMemo,
  useState,
} from "react"
import type {
  NativeSyntheticEvent,
  Text as RNText,
  TextInput,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  View,
} from "react-native"
import {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import useDOMRef from "@/hooks/useDOMRef"

const inputColors = cva("", {
  variants: {
    color: {
      card: "card",
      primary: "primary",
      danger: "danger",
      success: "success",
      warning: "warning",
    },
    focused: {
      card: "card/80",
      primary: "primary/80",
      danger: "danger/80",
      success: "success/80",
      warning: "warning/80",
    },
    placeholder: {
      card: "foreground",
      primary: "primary-foreground",
      danger: "danger-foreground",
      success: "success-foreground",
      warning: "warning-foreground",
    },
  },
})

const inputVariants = cva("flex-1", {
  variants: {
    color: {
      card: "text-card-foreground",
      primary: "text-primary-foreground",
      danger: "text-danger-foreground",
      success: "text-success-foreground",
      warning: "text-warning-foreground",
    },
  },
})

type Event<T> = NativeSyntheticEvent<T>

export type UseInputProps = {
  errorMessage?: string
  errorRef?: Ref<RNText>
  containerRef?: Ref<View>
  ref?: Ref<TextInput>
  isPassword?: boolean
} & ComponentPropsWithoutRef<typeof TextInput> &
  Pick<VariantProps<typeof inputColors>, "color">

const useInput = ({
  isPassword,
  textContentType,
  autoComplete,
  color = "card",
  errorMessage,
  onFocus,
  onEndEditing,
  ref,
  style,
  ...props
}: UseInputProps) => {
  const { tw } = useTheme()
  const inputRef = useDOMRef(ref)

  const inputColor = tw.color(inputColors({ color }))
  const inputFocusedColor = tw.color(inputColors({ focused: color }))
  const errorColor = tw.color(inputColors({ color: "danger" }))
  const errorFocusedColor = tw.color(inputColors({ focused: "danger" }))

  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleOnEndEditing = (event: Event<TextInputEndEditingEventData>) => {
    setIsFocused(false)
    onEndEditing?.(event)
  }
  const handleOnFocus = (event: Event<TextInputFocusEventData>) => {
    setIsFocused(true)
    onFocus?.(event)
  }

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const correctTextContentType = useMemo<typeof textContentType>(() => {
    if (textContentType) {
      return textContentType
    }

    if (isPassword) {
      return "password"
    }

    // eslint-disable-next-line no-undefined
    return undefined
  }, [isPassword, textContentType])

  const correctAutoComplete = useMemo<typeof autoComplete>(() => {
    if (autoComplete) {
      return autoComplete
    }

    if (isPassword) {
      return "password"
    }

    // eslint-disable-next-line no-undefined
    return undefined
  }, [autoComplete, isPassword])

  const progress = useDerivedValue(() => withTiming(isFocused ? 1 : 0))
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      inputColor,
      inputFocusedColor,
    ] as string[])

    return {
      backgroundColor,
    }
  }, [inputColor, inputFocusedColor, progress])
  const animatedErrorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [
      errorColor,
      errorFocusedColor,
    ] as string[])

    return {
      backgroundColor,
    }
  }, [errorColor, errorFocusedColor, progress])

  const handleFocusPressable = () => inputRef.current?.focus()

  return {
    textContentType: correctTextContentType,
    autoComplete: correctAutoComplete,
    isPassword,
    onFocus: handleOnFocus,
    onEndEditing: handleOnEndEditing,
    placeholderTextColor: tw.color(
      inputColors({ placeholder: errorMessage ? "danger" : color }),
    ),
    secureTextEntry: isPassword && !showPassword,
    onBlur: handleOnEndEditing,
    handleShowPassword,
    showPassword,
    errorMessage,
    handleFocusPressable,
    inputRef,
    style: tw.style(inputVariants({ color })),
    wrapperStyle: [
      errorMessage ? animatedErrorStyle : animatedStyle,
      tw.style(
        "shadow-sm px-3 py-2 min-h-10 rounded-md flex-row justify-between items-center",
      ),
      style,
    ],
    ...props,
  }
}

export default useInput
