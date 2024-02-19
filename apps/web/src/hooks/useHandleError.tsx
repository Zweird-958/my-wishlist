import type { RequestInstance } from "@hyper-fetch/core"
import { OnFinishedCallbackType } from "@hyper-fetch/react"
import toast from "react-hot-toast"

import useLocale from "@/hooks/useLocale"

const SUCCESS_STATUS = 200
const useHandleError = <RequestType extends RequestInstance>(
  errorsMap: Record<number, string> = {},
) => {
  const {
    translations: { errors },
  } = useLocale()
  const handleError: OnFinishedCallbackType<RequestType> = ({
    response: { status },
  }) => {
    if (status === SUCCESS_STATUS || !status) {
      return
    }

    const error = errorsMap[status]

    toast.error(error ?? errors.somethingWentWrong)
  }

  return { handleError }
}

export default useHandleError
