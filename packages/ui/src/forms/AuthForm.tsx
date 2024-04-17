import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { FieldValues } from "react-hook-form"

import Form, { type FormProps } from "../ui/Form"

type Props<T extends FieldValues> = {
  title: string
} & FormProps<T>

const AuthForm = <T extends FieldValues>(props: Props<T>) => {
  const {
    title,
    defaultValues,
    schema,
    onSubmit,
    fields,
    isLoading,
    buttonText,
    getErrorMessage,
  } = props

  return (
    <Card className="max-w-96 w-full py-4 px-2">
      <CardHeader>
        <h1 className="text-center w-full text-lg">{title}</h1>
      </CardHeader>
      <CardBody>
        <Form
          defaultValues={defaultValues}
          schema={schema}
          getErrorMessage={getErrorMessage}
          onSubmit={onSubmit}
          fields={fields}
          buttonText={buttonText}
          isLoading={isLoading}
        />
      </CardBody>
    </Card>
  )
}

export default AuthForm
