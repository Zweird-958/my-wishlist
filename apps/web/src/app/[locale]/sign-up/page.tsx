"use client"

import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/navigation"

import { signUp as signUpRequest } from "@my-wishlist/api/routes/user"
import { signUpSchema } from "@my-wishlist/schemas"
import type { SignUpData } from "@my-wishlist/types/User"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"
import Center from "@my-wishlist/ui/ui/Center"

import { useTranslation } from "@/app/i18n/client"
import useHandleError from "@/hooks/useHandleError"

const defaultValues = {
  username: "",
  email: "",
  password: "",
}
const SignIn = () => {
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signUpRequest)
  const { t } = useTranslation("forms", "common")
  const { handleError, getErrorMessage } =
    useHandleError<typeof signUpRequest>()
  const onSubmit = (data: SignUpData) => {
    submit({ data })
  }
  onSubmitSuccess(() => {
    router.push("/sign-in")
  })
  onSubmitFinished(handleError)

  return (
    <Center>
      <AuthForm
        defaultValues={defaultValues}
        schema={signUpSchema}
        getErrorMessage={getErrorMessage}
        onSubmit={onSubmit}
        fields={[
          { name: "username", label: t("username") },
          { name: "email", label: t("email") },
          { name: "password", label: t("password"), type: "password" },
        ]}
        buttonText={t("signUp.button")}
        isLoading={submitting}
        title={t("signUp.title")}
      />
    </Center>
  )
}

export default SignIn
