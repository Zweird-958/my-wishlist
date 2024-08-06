import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link, Stack } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "@/components/contexts/SessionContext"
import { useTheme } from "@/components/contexts/ThemeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Text } from "@/components/ui/text"

const SignIn = () => {
  const { tw } = useTheme()
  const { signIn } = useSession()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  })
  const { mutate } = useMutation({
    mutationFn: (data: SignInData) => api.post<string>("/sign-in", data),
    onSuccess: ({ result }) => signIn(result),
  })
  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <View style={tw.style("flex-1 gap-12 p-8")}>
      <Stack.Screen options={{ title: "Sign In" }} />

      <View style={tw.style("gap-3 items-center mt-20")}>
        <Text style={tw.style("text-2xl font-semibold")}>Sign In</Text>
        <Text style={tw.style("font-medium text-foreground/50")}>
          Welcome back! Please enter your details 👋🏻
        </Text>
      </View>
      <View style={tw.style("gap-4 items-center justify-center")}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message?.toString()}
              autoComplete="email"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message?.toString()}
              isPassword
            />
          )}
          name="password"
        />

        <Button onPress={onSubmit} isText>
          Submit
        </Button>
      </View>

      <View
        style={tw.style("flex-row gap-1 flex-1 items-end justify-center pb-4")}
      >
        <Text>Don't have an account ?</Text>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text color="primary">Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default SignIn
