"use client"

import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/navigation"

import { signIn as signInRequest } from "@my-wishlist/api/routes/user"
import { useTranslation } from "@my-wishlist/i18n"
import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types/User"

import useHandleError from "../../hooks/useHandleError"
import { useSession } from "../AppContext"
import Center from "../Center"
import AuthForm from "../forms/AuthForm"

const defaultValues = {
  email: "",
  password: "",
}
const SignIn = () => {
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signInRequest)
  const { signIn } = useSession()
  const { t } = useTranslation("errors", "forms")
  const { handleError } = useHandleError<typeof signInRequest>({
    401: t("errors:invalidCredentials"),
  })
  const onSubmit = (data: SignInData) => {
    submit({ data })
  }
  onSubmitSuccess(({ response }) => {
    signIn(response.result)
    router.push("/")
  })
  onSubmitFinished(handleError)

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
        isLoading={submitting}
        title={t("forms:signIn.title")}
      />
    </Center>
  )
}

export default SignIn
