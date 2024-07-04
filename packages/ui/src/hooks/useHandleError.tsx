"use client"

import { AxiosError } from "axios"
import toast from "react-hot-toast"

import { ApiError } from "@my-wishlist/types/Api"

import { useTranslation } from "../components/AppContext"

export type ErrorsMap = Record<number, string>
export type ErrorsCallback = Record<number, () => void>

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
  const handleError = ({ response }: AxiosError<ApiError>) => {
    if (!response) {
      return
    }

    const { status } = response

    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap?.[status]

    toast.error(error ?? t("somethingWentWrong"))
    errorsCallback?.[status]?.()
  }

  return { handleError }
}

export default useHandleError
