"use client"

import { useSubmit } from "@hyper-fetch/react"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import toast from "react-hot-toast"

import { signIn as signInRequest } from "@my-wishlist/api/routes/user"
import { signInSchema } from "@my-wishlist/schemas"
import type { SignInData } from "@my-wishlist/types/User"
import Form from "@my-wishlist/ui/ui/Form"

import useLocale from "@/hooks/useLocale"
import useSession from "@/hooks/useSession"

const defaultValues = {
  email: "",
  password: "",
}
const SignIn = () => {
  const { submit, onSubmitSuccess, onSubmitError } = useSubmit(signInRequest)
  const { signIn } = useSession()
  const {
    translations: { forms, zodErrors },
  } = useLocale()
  const onSubmit = (data: SignInData) => {
    submit({ data })
  }
  onSubmitSuccess(({ response }) => {
    signIn(response.result)
  })
  onSubmitError(({ response }) => {
    if (!response) {
      return
    }

    toast.error(response.error)
  })

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="max-w-96 w-full py-4 px-2">
        <CardHeader>
          <h1 className="text-center w-full text-lg">{forms.signIn.title}</h1>
        </CardHeader>
        <CardBody>
          <Form
            defaultValues={defaultValues}
            schema={signInSchema}
            zodErrors={zodErrors}
            onSubmit={onSubmit}
            fields={[
              { name: "email", label: "Email" },
              { name: "password", label: "Password", type: "password" },
            ]}
            buttonText={forms.signIn.button}
          ></Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default SignIn
