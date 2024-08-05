import { Eye, EyeOff } from "lucide-react-native"
import { forwardRef } from "react"
import { Pressable, TextInput, TouchableOpacity, View } from "react-native"
import Animated from "react-native-reanimated"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Text } from "@/components/ui/Text"
import useInput, { type UseInputProps } from "@/components/ui/input/use-input"

export type InputProps = UseInputProps

const TextInputAnimated = Animated.createAnimatedComponent(TextInput)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const Input = forwardRef<TextInput, InputProps>((props, ref) => {
  const { tw } = useTheme()
  const {
    style,
    errorMessage,
    containerRef,
    errorRef,
    isPassword,
    animatedStyle,
    handleShowPassword,
    showPassword,
    handleFocusPressable,
    inputRef,
    ...otherProps
  } = useInput({ ...props, ref })

  return (
    <View style={tw.style("gap-1")} ref={containerRef}>
      <AnimatedPressable onPress={handleFocusPressable}>
        <Animated.View
          style={[
            animatedStyle,
            tw.style(
              "shadow-sm px-3 py-2 min-h-10 rounded-md flex-row justify-between items-center",
            ),
            style,
          ]}
        >
          <TextInputAnimated
            ref={inputRef}
            style={tw.style("flex-1")}
            {...otherProps}
          />
          {isPassword && (
            <TouchableOpacity onPress={handleShowPassword}>
              {showPassword ? (
                <Eye color={tw.color("card")} size={22} />
              ) : (
                <EyeOff color={tw.color("card")} size={22} />
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </AnimatedPressable>

      {errorMessage && (
        <Text color="danger" ref={errorRef}>
          {errorMessage}
        </Text>
      )}
    </View>
  )
})

Input.displayName = "Input"

export default Input
