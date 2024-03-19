"use client"

import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/navigation"

import { signIn as signInRequest } from "@my-wishlist/api/routes/user"
import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types/User"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"

import { useTranslation } from "@/app/i18n/client"
import useHandleError from "@/hooks/useHandleError"
import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"

const defaultValues = {
  email: "",
  password: "",
}
const SignIn = () => {
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signInRequest)
  const { signIn } = useSession()
  const {
    translations: { zodErrors },
  } = useLocale()
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
    <div className="h-screen flex items-center justify-center w-full absolute top-0">
      <AuthForm
        defaultValues={defaultValues}
        schema={signInSchema}
        zodErrors={zodErrors}
        onSubmit={onSubmit}
        fields={[
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
        ]}
        buttonText={t("forms:signIn.button")}
        isLoading={submitting}
        title={t("forms:signIn.title")}
      />
    </div>
  )
}

export default SignIn
