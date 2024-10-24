"use client"

import { useState } from "react"

import useMutation from "./useMutation"

const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null)

  const { mutate: addImageMutate, isPending: imageIsLoading } = useMutation<
    string,
    FormData
  >({
    method: "post",
    path: "/image",
  })

  return { image, setImage, addImageMutate, imageIsLoading }
}

export default useUploadImage
