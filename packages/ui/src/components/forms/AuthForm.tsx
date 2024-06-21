import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { InputHTMLAttributes } from "react"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { ZodSchema } from "zod"

import { HandleErrorMessage } from "../../types/Form"
import Field from "../Field"

type Field<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
}

type FormProps<T extends FieldValues> = {
  fields: Field<T>[]
  defaultValues: DefaultValues<T>
  schema: ZodSchema<T>
  buttonText: string
  onSubmit: SubmitHandler<T>
  isLoading?: boolean
}

type Props<T extends FieldValues> = {
  title: string
  handleErrorMessage: HandleErrorMessage<T>
} & FormProps<T>

const AuthForm = <T extends FieldValues>({
  title,
  defaultValues,
  schema,
  onSubmit,
  fields,
  isLoading,
  buttonText,
  handleErrorMessage,
}: Props<T>) => {
  const { control, handleSubmit } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <Card className="max-w-96 w-full py-4 px-2">
      <CardHeader>
        <h1 className="text-center w-full text-lg">{title}</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {fields.map(({ name, ...fieldProps }) => (
            <Field
              key={name}
              name={name}
              control={control}
              handleErrorMessage={handleErrorMessage}
              {...fieldProps}
            />
          ))}

          <Button type="submit" color="primary" isLoading={isLoading}>
            {buttonText}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}

export default AuthForm
