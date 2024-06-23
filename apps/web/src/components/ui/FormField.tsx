"use client"

import { FieldValues } from "react-hook-form"

import Field, { type FormProps } from "@my-wishlist/ui/Field"

import useHandleError from "@/hooks/useHandleError"

const FormField = <TFieldValues extends FieldValues>(
  props: Omit<FormProps<TFieldValues>, "handleErrorMessage">,
) => {
  const { getErrorMessage } = useHandleError()

  return <Field {...props} handleErrorMessage={getErrorMessage} />
}

export default FormField
