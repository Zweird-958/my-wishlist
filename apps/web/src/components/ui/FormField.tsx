import { FieldValues } from "react-hook-form"

import Field, { type FormProps } from "@my-wishlist/ui/ui/FormField"

import useHandleError from "@/hooks/useHandleError"

const FormField = <TFieldValues extends FieldValues>(
  props: Omit<FormProps<TFieldValues>, "getErrorMessage">,
) => {
  const { getErrorMessage } = useHandleError()

  return <Field {...props} getErrorMessage={getErrorMessage} />
}

export default FormField
