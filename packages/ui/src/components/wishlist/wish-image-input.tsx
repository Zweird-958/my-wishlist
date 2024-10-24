"use client"

import { Button } from "@nextui-org/react"
import type { ChangeEventHandler, Dispatch, SetStateAction } from "react"

import { useTranslation } from "../AppContext"

type Props = {
  image: File | null
  setImage: Dispatch<SetStateAction<File | null>>
}

const WishImageInput = ({ image, setImage }: Props) => {
  const { t } = useTranslation("forms")
  const handleFileUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { files } = event.target
    setImage(files?.item(0) ?? null)
  }

  return (
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
}

export default WishImageInput
