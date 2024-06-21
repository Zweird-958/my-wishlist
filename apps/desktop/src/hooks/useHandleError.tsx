"use client"

import type { RequestInstance } from "@hyper-fetch/core"
import { OnFinishedCallbackType } from "@hyper-fetch/react"
import { useTranslations } from "next-intl"
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"
import toast from "react-hot-toast"

const SUCCESS_STATUS = 200
const useHandleError = <RequestType extends RequestInstance>(
  errorsMap?: Record<number, string>,
  errorsCallback?: Record<number, () => void>,
) => {
  const t = useTranslations()
  const handleError: OnFinishedCallbackType<RequestType> = ({
    response: { status },
  }) => {
    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap?.[status]

    toast.error(error ?? t("errors.somethingWentWrong"))
    errorsCallback?.[status]?.()
  }
  const handleErrorMessage = <T extends FieldValues>(
    field: ControllerRenderProps<T, Path<T>>,
    error: FieldErrors<T>,
  ) =>
    // @ts-expect-error - This is a hack to get the error message from the zod error
    t(`zodErrors.${field.name}.${error[field.name]?.message}`)

  return { handleError, handleErrorMessage }
}

export default useHandleError
