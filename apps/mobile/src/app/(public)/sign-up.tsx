import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"

import { signUpSchema } from "@my-wishlist/schemas"

import AuthForm from "@/components/forms/auth-form"
import useClient from "@/hooks/use-client"
import useMutation from "@/hooks/use-mutation"

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
  const client = useClient()
  const { mutate, isPending } = useMutation(client["sign-up"].$post, {
    onSuccess: () => router.push("/sign-in"),
  })
  const onSubmit = handleSubmit((data) => mutate({ json: data }))

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
