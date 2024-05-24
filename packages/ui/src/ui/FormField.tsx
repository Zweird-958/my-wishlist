"use client"

import { FieldValues } from "react-hook-form"

import useHandleError from "../hooks/useHandleError"
import Field, { type FormProps } from "./Field"

const FormField = <TFieldValues extends FieldValues>(
  props: Omit<FormProps<TFieldValues>, "getErrorMessage">,
) => {
  const { getErrorMessage } = useHandleError()

  return <Field {...props} getErrorMessage={getErrorMessage} />
}

export default FormField
