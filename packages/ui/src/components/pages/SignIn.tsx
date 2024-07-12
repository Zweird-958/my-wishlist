"use client"

import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types"

import useMutation from "../../hooks/useMutation"
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
  const { mutate, isPending } = useMutation<string, SignInData>({
    method: "post",
    path: "/sign-in",
    errorsMap: {
      401: t("errors:invalidCredentials"),
    },
    onSuccess: ({ result }) => {
      signIn(result)
      void router.push("/")
    },
  })
  const { signIn } = useSession()
  const onSubmit = (data: SignInData) => {
    mutate(data)
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
