import { Input, type InputProps } from "@nextui-org/react"
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form"

import { useTranslation } from "../components/AppContext"

export type FormProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
} & InputProps

const Field = <TFieldValues extends FieldValues>({
  name,
  control,
  ...props
}: FormProps<TFieldValues>) => {
  const { t } = useTranslation("zodErrors")
  const handleErrorMessage = (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>,
    error: FieldErrors<TFieldValues>,
  ) => t(`${field.name}.${error[field.name]?.message?.toString()}`)

  return (
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
}

export default Field
