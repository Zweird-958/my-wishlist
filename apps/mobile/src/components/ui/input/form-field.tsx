import {
  Controller,
  type ControllerProps,
  type FieldErrors,
  type FieldValues,
  type Path,
} from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Input, type InputProps } from "@/components/ui/input"

type Props<TFieldValues extends FieldValues> = Omit<
  ControllerProps<TFieldValues>,
  "render"
> &
  Omit<InputProps, "onBlur" | "onChangeText" | "value" | "errorMessage">

const FormField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...props
}: Props<TFieldValues>) => {
  const { t } = useTranslation()
  const handleErrorMessage = (
    fieldName: Path<TFieldValues>,
    error: FieldErrors<TFieldValues>,
  ) => t(`errors.${fieldName}.${error[fieldName]?.message?.toString()}`)

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      disabled={disabled}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({
        field: { onChange, onBlur, value, name: fieldName },
        formState: { errors },
      }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          errorMessage={
            errors[fieldName] && handleErrorMessage(fieldName, errors)
          }
          {...props}
        />
      )}
      name={name}
    />
  )
}

export default FormField
