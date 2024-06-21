import { Input, InputProps } from "@nextui-org/react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"

import { HandleErrorMessage } from "../types/Form"

export type FormProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  handleErrorMessage: HandleErrorMessage<TFieldValues>
} & InputProps

const Field = <TFieldValues extends FieldValues>({
  name,
  control,
  handleErrorMessage,
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
        isInvalid={errors[name] && true}
        errorMessage={errors[name] && handleErrorMessage(field, errors)}
      />
    )}
  />
)

export default Field
