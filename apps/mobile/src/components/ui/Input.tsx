import { type VariantProps, cva } from "class-variance-authority"
import {
  type ComponentPropsWithoutRef,
  type Ref,
  forwardRef,
  useState,
} from "react"
import {
  type NativeSyntheticEvent,
  type Text as RNText,
  TextInput,
  type TextInputEndEditingEventData,
  type TextInputFocusEventData,
  View,
} from "react-native"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Text } from "@/components/ui/Text"

const inputColors = cva("", {
  variants: {
    color: {
      card: "card",
      primary: "primary",
      danger: "danger",
    },
    focused: {
      card: "card/80",
      primary: "primary/80",
      danger: "danger/80",
    },
    placeholder: {
      card: "foreground",
      primary: "primary-foreground",
      danger: "danger-foreground",
    },
  },
})

type InputProps = {
  errorMessage?: string
  errorRef?: Ref<RNText>
  containerRef?: Ref<View>
} & ComponentPropsWithoutRef<typeof TextInput> &
  Pick<VariantProps<typeof inputColors>, "color">

type Event<T> = NativeSyntheticEvent<T>

const TextInputAnimated = Animated.createAnimatedComponent(TextInput)

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      style,
      color = "card",
      onEndEditing,
      onFocus,
      errorMessage,
      containerRef,
      errorRef,
      ...props
    },
    ref,
  ) => {
    const { tw } = useTheme()
    const parsedColor: typeof color = errorMessage ? "danger" : color
    const inputColor = tw.color(inputColors({ color: parsedColor }))
    const inputFocusedColor = tw.color(inputColors({ focused: parsedColor }))
    const [isFocused, setIsFocused] = useState(false)

    const handleOnEndEditing = (event: Event<TextInputEndEditingEventData>) => {
      setIsFocused(false)
      onEndEditing?.(event)
    }
    const handleOnFocus = (event: Event<TextInputFocusEventData>) => {
      setIsFocused(true)
      onFocus?.(event)
    }

    const progress = useDerivedValue(() => withTiming(isFocused ? 1 : 0))
    const animatedStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(progress.value, [0, 1], [
        inputColor,
        inputFocusedColor,
      ] as string[])

      return {
        backgroundColor,
      }
    })

    return (
      <View style={tw.style("gap-1")} ref={containerRef}>
        <TextInputAnimated
          ref={ref}
          onEndEditing={handleOnEndEditing}
          onFocus={handleOnFocus}
          placeholderTextColor={tw.color(
            inputColors({ placeholder: parsedColor }),
          )}
          style={[
            tw.style("shadow-sm px-3 py-2 min-h-10 rounded-md"),
            animatedStyle,
            style,
          ]}
          {...props}
        />
        {errorMessage && (
          <Text color="danger" ref={errorRef}>
            {errorMessage}
          </Text>
        )}
      </View>
    )
  },
)

Input.displayName = "Input"
