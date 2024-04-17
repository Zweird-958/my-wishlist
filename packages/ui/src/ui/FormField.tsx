import { Input, InputProps } from "@nextui-org/react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import { GetErrorMessage } from "../types/Form"

export type FormProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  getErrorMessage: GetErrorMessage<TFieldValues>
} & InputProps

const FormField = <TFieldValues extends FieldValues>({
  name,
  control,
  getErrorMessage,
  ...props
}: FormProps<TFieldValues>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, formState: { errors } }) => (
      <Input
        color="primary"
        variant="bordered"
        {...field}
        size="md"
        {...props}
        errorMessage={errors[name] && getErrorMessage(field, errors)}
      />
    )}
  />
)

export default FormField
