import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/navigation"

import { signUp as signUpRequest } from "@my-wishlist/api/routes/user"
import { signUpSchema } from "@my-wishlist/schemas"
import type { SignUpData } from "@my-wishlist/types/User"
import Center from "@my-wishlist/ui/Center"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"

import useHandleError from "@/hooks/useHandleError"
import useTranslation from "@/hooks/useTranslation"

const defaultValues = {
  username: "",
  email: "",
  password: "",
}
const SignUp = () => {
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signUpRequest)
  const {
    t: { forms },
  } = useTranslation()
  const { handleError, handleErrorMessage } =
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
        onSubmit={onSubmit}
        fields={[
          { name: "username", label: forms.username },
          { name: "email", label: forms.email, type: "email" },
          { name: "password", label: forms.password, type: "password" },
        ]}
        buttonText={forms.signUp.button}
        isLoading={submitting}
        title={forms.signUp.title}
        handleErrorMessage={handleErrorMessage}
      />
    </Center>
  )
}

export default SignUp
