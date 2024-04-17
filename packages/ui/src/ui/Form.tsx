"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { InputHTMLAttributes } from "react"
import {
  Controller,
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { ZodSchema } from "zod"

import { GetErrorMessage } from "../types/Form"

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
  getErrorMessage: GetErrorMessage<T>
  isLoading?: boolean
}
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const {
    defaultValues,
    onSubmit,
    schema,
    fields,
    buttonText,
    getErrorMessage,
    isLoading,
  } = props
  const { control, handleSubmit } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })

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
              errorMessage={errors[name] && getErrorMessage(field, errors)}
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
