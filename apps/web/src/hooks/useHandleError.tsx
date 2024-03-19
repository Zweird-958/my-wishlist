"use client"

import type { RequestInstance } from "@hyper-fetch/core"
import { OnFinishedCallbackType } from "@hyper-fetch/react"
import toast from "react-hot-toast"

import { useTranslation } from "@/app/i18n/client"

const SUCCESS_STATUS = 200
const useHandleError = <RequestType extends RequestInstance>(
  errorsMap: Record<number, string> = {},
) => {
  const { t } = useTranslation("errors")
  const handleError: OnFinishedCallbackType<RequestType> = ({
    response: { status },
  }) => {
    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap[status]

    toast.error(error ?? t("somethingWentWrong"))
  }

  return { handleError }
}

export default useHandleError
