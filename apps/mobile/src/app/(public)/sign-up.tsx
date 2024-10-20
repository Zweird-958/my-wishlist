import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"

import { signUpSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import AuthForm from "@/components/forms/auth-form"

const SignIn = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  })

  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) => api.post<string>("/sign-up", data),
    onSuccess: () => router.push("/sign-in"),
  })
  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthForm
      control={control}
      onSubmit={onSubmit}
      authType="signUp"
      isLoading={isPending}
    />
  )
}

export default SignIn
