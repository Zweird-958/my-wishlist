"use client"

import { useSubmit } from "@hyper-fetch/react"

import { signUp as signUpRequest } from "@my-wishlist/api/routes/user"
import { signUpSchema } from "@my-wishlist/schemas"
import type { SignUpData } from "@my-wishlist/types/User"

import useHandleError from "../../hooks/useHandleError"
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
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signUpRequest)
  const { t } = useTranslation("forms", "common")
  const { handleError } = useHandleError<typeof signUpRequest>()
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
        onSubmit={onSubmit}
        fields={[
          { name: "username", label: t("username") },
          { name: "email", label: t("email"), type: "email" },
          { name: "password", label: t("password"), type: "password" },
        ]}
        buttonText={t("signUp.button")}
        isLoading={submitting}
        title={t("signUp.title")}
      />
    </Center>
  )
}

export default SignUp
