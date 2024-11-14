"use client"

import toast from "react-hot-toast"

import type { ApiClientError } from "@my-wishlist/api"

import { useTranslation } from "../components/AppContext"

type ErrorsMap = Record<number, string>
type ErrorsCallback = Record<number, () => void>

export type HandleErrorParams = {
  errorsMap?: ErrorsMap
  errorsCallback?: ErrorsCallback
}

const SUCCESS_STATUS = 200
const useHandleError = (
  errorsMap?: ErrorsMap,
  errorsCallback?: ErrorsCallback,
) => {
  const { t } = useTranslation("errors", "zodErrors")
  const handleError = ({ status }: ApiClientError) => {
    if (status === SUCCESS_STATUS) {
      return
    }

    const error = errorsMap?.[status]

    toast.error(error ?? t("somethingWentWrong"))
    errorsCallback?.[status]?.()
  }

  return { handleError }
}

export default useHandleError
