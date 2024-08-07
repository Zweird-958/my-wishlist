"use client"

import { signUpSchema } from "@my-wishlist/schemas"
import type { SignUpData } from "@my-wishlist/types"

import useMutation from "../../hooks/useMutation"
import { useRouter, useTranslation } from "../AppContext"
import Center from "../Center"
import AuthForm from "../forms/AuthForm"

const defaultValues = {
  username: "",
  email: "",
  password: "",
}
const SignUp = () => {
  const router = useRouter()
  const { t } = useTranslation("forms", "common", "errors")

  const { mutate, isPending } = useMutation<string, SignUpData>({
    method: "post",
    path: "/sign-up",
    onSuccess: () => {
      void router.push("/sign-in")
    },
    errorsMap: { 409: t("errors:usernameExists") },
  })
  const onSubmit = (data: SignUpData) => {
    mutate(data)
  }

  return (
    <Center>
      <AuthForm
        defaultValues={defaultValues}
        schema={signUpSchema}
        onSubmit={onSubmit}
        fields={[
          { name: "username", label: t("username") },
          { name: "email", label: t("email"), type: "email" },
          { name: "password", label: t("password"), type: "password" },
        ]}
        buttonText={t("signUp.button")}
        isLoading={isPending}
        title={t("signUp.title")}
      />
    </Center>
  )
}

export default SignUp
