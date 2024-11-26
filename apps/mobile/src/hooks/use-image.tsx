import * as ImagePicker from "expo-image-picker"
import { useCallback, useState } from "react"

import { useGenericMutation as useMutation } from "@my-wishlist/react"
import type { UploadMobileImage } from "@my-wishlist/types"

import api from "@/utils/api"

const useImage = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0] ?? null)
    }
  }, [])

  const { mutate: uploadImage, isPending } = useMutation({
    mutationKey: ["addWish"],
    mutationFn: (data: { image: UploadMobileImage }) =>
      api.post<string>("/image", data),
  })

  return { image, pickImage, uploadImage, isLoading: isPending }
}

export default useImage
