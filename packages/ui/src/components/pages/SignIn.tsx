"use client"

import { useClient } from "@my-wishlist/react"
import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types"

import useMutation from "../../hooks/use-mutation"
import { useRouter, useSession, useTranslation } from "../AppContext"
import Center from "../Center"
import AuthForm from "../forms/AuthForm"

const defaultValues = {
  email: "",
  password: "",
}
const SignIn = () => {
  const router = useRouter()
  const { t } = useTranslation("errors", "forms")
  const { client } = useClient()
  const { mutate, isPending } = useMutation(client["sign-in"].$post, {
    onSuccess: ({ result }) => {
      void signIn(result)
      void router.push("/")
    },
    errorsMap: {
      401: t("errors:invalidCredentials"),
    },
  })
  const { signIn } = useSession()
  const onSubmit = (data: SignInData) => {
    mutate({ json: data })
  }

  return (
    <Center>
      <AuthForm
        defaultValues={defaultValues}
        schema={signInSchema}
        onSubmit={onSubmit}
        fields={[
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        buttonText={t("forms:signIn.button")}
        isLoading={isPending}
        title={t("forms:signIn.title")}
      />
    </Center>
  )
}

export default SignIn
