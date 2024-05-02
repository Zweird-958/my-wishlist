"use client"

import type { RequestInstance } from "@hyper-fetch/core"
import { OnFinishedCallbackType } from "@hyper-fetch/react"
import {
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form"
import toast from "react-hot-toast"

import { useTranslation } from "@/app/i18n/client"

const SUCCESS_STATUS = 200
const useHandleError = <RequestType extends RequestInstance>(
  errorsMap?: Record<number, string>,
  errorsCallback?: Record<number, () => void>,
) => {
  const { t } = useTranslation("errors", "zodErrors")
  const handleError: OnFinishedCallbackType<RequestType> = ({
    response: { status },
  }) => {
    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap?.[status]

    toast.error(error ?? t("somethingWentWrong"))
    errorsCallback?.[status]?.()
  }
  const getErrorMessage = <T extends FieldValues>(
    field: ControllerRenderProps<T, Path<T>>,
    error: FieldErrors<T>,
  ) => t(`zodErrors:${field.name}.${error[field.name]?.message}`)

  return { handleError, getErrorMessage }
}

export default useHandleError
