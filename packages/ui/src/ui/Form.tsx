"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { InputHTMLAttributes } from "react"
import {
  Controller,
  ControllerRenderProps,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { ZodSchema } from "zod"

type Field<T extends FieldValues> = {
  name: Path<T>
  label: string
  type?: InputHTMLAttributes<HTMLInputElement>["type"]
}

export type FormProps<T extends FieldValues> = {
  fields: Field<T>[]
  defaultValues: DefaultValues<T>
  schema: ZodSchema<T>
  buttonText: string
  onSubmit: SubmitHandler<T>
  zodErrors: (field: string) => (error: string) => string
  isLoading?: boolean
}
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    defaultValues,
    onSubmit,
    schema,
    fields,
    buttonText,
    zodErrors,
    isLoading,
  } = props
  const { control, handleSubmit } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })
  const getErrorMessage = (field: ControllerRenderProps<T, Path<T>>) => {
    const result = schema.safeParse({ [field.name]: field.value })

    if (result.success) {
      return null
    }

    const fieldErrors = zodErrors(field.name)

    if (!fieldErrors) {
      return null
    }

    const [error] = result.error.issues.filter((issue) =>
      issue.path.includes(field.name),
    )

    return fieldErrors(error?.message) ?? null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {fields.map(({ name, ...fieldProps }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field, formState: { errors } }) => (
            <Input
              {...fieldProps}
              {...field}
              size="sm"
              errorMessage={errors[name] && getErrorMessage(field)}
            />
          )}
        />
      ))}

      <Button type="submit" color="primary" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  )
}

export default Form
