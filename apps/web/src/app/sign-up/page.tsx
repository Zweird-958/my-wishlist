"use client"

import { useSubmit } from "@hyper-fetch/react"
import { useRouter } from "next/navigation"

import { signUp as signUpRequest } from "@my-wishlist/api/routes/user"
import { signUpSchema } from "@my-wishlist/schemas"
import type { SignUpData } from "@my-wishlist/types/User"
import AuthForm from "@my-wishlist/ui/forms/AuthForm"

import useHandleError from "@/hooks/useHandleError"
import useLocale from "@/hooks/useLocale"

const defaultValues = {
  username: "",
  email: "",
  password: "",
}
const SignIn = () => {
  const router = useRouter()
  const { submit, onSubmitSuccess, onSubmitFinished, submitting } =
    useSubmit(signUpRequest)
  const {
    translations: { forms, zodErrors },
  } = useLocale()
  const { handleError } = useHandleError<typeof signUpRequest>()
  const onSubmit = (data: SignUpData) => {
    submit({ data })
  }
  onSubmitSuccess(() => {
    router.push("/sign-in")
  })
  onSubmitFinished(handleError)

  return (
    <div className="h-screen flex items-center justify-center w-full absolute top-0">
      <AuthForm
        defaultValues={defaultValues}
        schema={signUpSchema}
        zodErrors={zodErrors}
        onSubmit={onSubmit}
        fields={[
          { name: "username", label: forms.username },
          { name: "email", label: forms.email },
          { name: "password", label: forms.password, type: "password" },
        ]}
        buttonText={forms.signUp.button}
        isLoading={submitting}
        title={forms.signUp.title}
      />
    </div>
  )
}

export default SignIn
