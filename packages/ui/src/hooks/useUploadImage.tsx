"use client"

import { Button } from "@nextui-org/react"
import { type ChangeEventHandler, useState } from "react"

import { useTranslation } from "../components/AppContext"

const useUploadImage = () => {
  const [image, setImage] = useState<File | null>(null)
  const { t } = useTranslation("forms")

  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target
    setImage(files?.item(0) || null)
  }

  const SelectImage = () => (
    <Button as={"div"} color="primary" className="w-full">
      <label htmlFor="image" className="truncate">
        {image ? image.name : t("image")}
      </label>
      <input
        id="image"
        hidden
        onChange={handleFileUpload}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
      />
    </Button>
  )

  return { image, SelectImage }
}

export default useUploadImage
