"use client"

import { Button } from "@ui/components/ui/button"
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
    <Button color="primary" className="w-full p-0" asChild>
      <div>
        <label
          htmlFor="image"
          className="flex size-full items-center justify-center truncate"
        >
          {image ? image.name : t("image")}
        </label>
        <input
          id="image"
          hidden
          onChange={handleFileUpload}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </Button>
  )
}

export default WishImageInput
