import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "expo-router"
import { useForm } from "react-hook-form"

import { signInSchema } from "@my-wishlist/schemas"

import { useSession } from "@/components/contexts/SessionContext"
import AuthForm from "@/components/forms/auth-form"
import useClient from "@/hooks/use-client"
import useMutation from "@/hooks/use-mutation"

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
  const client = useClient()
  const { mutate, isPending } = useMutation(client["sign-in"].$post, {
    onSuccess: async ({ result }) => {
      await signIn(result)
      router.replace("/")
    },
  })
  const onSubmit = handleSubmit((data) => mutate({ json: data }))

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
