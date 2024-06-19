"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/react"
import { InputHTMLAttributes } from "react"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { ZodSchema } from "zod"

import FormField from "./FormField"

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
  isLoading?: boolean
}
const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { defaultValues, onSubmit, schema, fields, buttonText, isLoading } =
    props
  const { control, handleSubmit } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {fields.map(({ name, ...fieldProps }) => (
        <FormField key={name} name={name} control={control} {...fieldProps} />
      ))}

      <Button type="submit" color="primary" isLoading={isLoading}>
        {buttonText}
      </Button>
    </form>
  )
}

export default Form
