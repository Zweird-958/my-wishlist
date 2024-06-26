import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/router"

import { signIn as signInRequest } from "@my-wishlist/api/routes/user"
import { useTranslation } from "@my-wishlist/i18n/desktop"
import { signInSchema } from "@my-wishlist/schemas"
import { SignInData } from "@my-wishlist/types/User"
import Center from "@my-wishlist/ui/Center"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"

import useHandleError from "@/hooks/useHandleError"
import useSession from "@/hooks/useSession"

const SignIn = () => {
  const defaultValues = {
    email: "",
    password: "",
  }
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signInRequest)
  const { signIn } = useSession()
  const { t } = useTranslation("forms", "errors")
  const { handleError } = useHandleError<typeof signInRequest>({
    401: t("errors.invalidCredentials"),
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
          { name: "email", label: t("email"), type: "email" },
          { name: "password", label: t("password"), type: "password" },
        ]}
        buttonText={t("signIn.button")}
        isLoading={submitting}
        title={t("signIn.title")}
      />
    </Center>
  )
}

export default SignIn
