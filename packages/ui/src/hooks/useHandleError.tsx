"use client"

import type { RequestInstance } from "@hyper-fetch/core"
import { OnFinishedCallbackType } from "@hyper-fetch/react"
import toast from "react-hot-toast"

import { useTranslation } from "@my-wishlist/i18n/utils"

const SUCCESS_STATUS = 200
const useHandleError = <RequestType extends RequestInstance>(
  errorsMap?: Record<number, string>,
  errorsCallback?: Record<number, () => void>,
) => {
  // const { t } = useTranslation("errors", "zodErrors")
  const handleError: OnFinishedCallbackType<RequestType> = ({
    response: { status },
  }) => {
    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap?.[status]

    // toast.error(error ?? t("somethingWentWrong"))
    errorsCallback?.[status]?.()
  }

  return { handleError }
}

export default useHandleError
