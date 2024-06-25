import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/router"

import { signIn as signInRequest } from "@my-wishlist/api/routes/user"
import { signInSchema } from "@my-wishlist/schemas"
import { SignInData } from "@my-wishlist/types/User"
import Center from "@my-wishlist/ui/Center"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"

import useHandleError from "@/hooks/useHandleError"
import useSession from "@/hooks/useSession"
import useTranslation from "@/hooks/useTranslation"

const SignIn = () => {
  const defaultValues = {
    email: "",
    password: "",
  }
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signInRequest)
  const { signIn } = useSession()
  const {
    t: { errors, forms },
  } = useTranslation()
  const { handleError, handleErrorMessage } = useHandleError<
    typeof signInRequest
  >({
    401: errors.invalidCredentials,
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
          { name: "email", label: forms.email },
          { name: "password", label: forms.password, type: "password" },
        ]}
        buttonText={forms.signIn.button}
        isLoading={submitting}
        title={forms.signIn.title}
        handleErrorMessage={handleErrorMessage}
      />
    </Center>
  )
}

export default SignIn
