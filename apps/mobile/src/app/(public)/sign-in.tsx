import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"

import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "@/components/contexts/SessionContext"
import AuthForm from "@/components/forms/auth-form"

const SignIn = () => {
  const { signIn } = useSession()
  const router = useRouter()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  })
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInData) => api.post<string>("/sign-in", data),
    onSuccess: async ({ result }) => {
      await signIn(result)
      router.replace("/")
    },
  })
  const onSubmit = handleSubmit((data) => mutate(data))

  return (
    <AuthForm
      control={control}
      onSubmit={onSubmit}
      authType="signIn"
      isLoading={isPending}
    />
  )
}

export default SignIn
