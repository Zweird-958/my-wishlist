import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { Button } from "@ui/components/ui/button"
import type { InputHTMLAttributes } from "react"
import {
  type DefaultValues,
  type FieldValues,
  type Path,
  type SubmitHandler,
  useForm,
} from "react-hook-form"
import type { ZodSchema } from "zod"

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
} & FormProps<T>

const AuthForm = <T extends FieldValues>({
  title,
  defaultValues,
  schema,
  onSubmit,
  fields,
  isLoading,
  buttonText,
}: Props<T>) => {
  const { control, handleSubmit } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <Card className="w-full max-w-96 px-2 py-4">
      <CardHeader>
        <h1 className="w-full text-center text-lg">{title}</h1>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {fields.map(({ name, ...fieldProps }) => (
            <Field key={name} name={name} control={control} {...fieldProps} />
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
