"use client"

import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"
import { useState } from "react"

import { ApiClientError } from "@my-wishlist/api"
import type { ApiError, ApiResponse } from "@my-wishlist/types"
import { api } from "@my-wishlist/utils"

import { useSession } from "../components/AppContext"
import useHandleError from "./useHandleError"

const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null)
  const { token } = useSession()

  const { handleError } = useHandleError()

  const { mutate: addImageMutate, isPending: imageIsLoading } = useMutation<
    ApiResponse<string>,
    AxiosError<ApiError>,
    FormData
  >({
    mutationKey: ["image"],
    mutationFn: async (data) =>
      await api.post<string>("/image", data, {
        headers: { Authorization: token },
      }),
    onError: ({ response }) => {
      if (!response) {
        return
      }

      const { status, data } = response

      if (status === 200) {
        return
      }

      const error = new ApiClientError(data.error, status)

      handleError(error)
    },
  })

  return { image, setImage, addImageMutate, imageIsLoading }
}

export default useUploadImage
