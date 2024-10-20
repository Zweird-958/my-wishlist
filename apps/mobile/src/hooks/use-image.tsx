import * as ImagePicker from "expo-image-picker"
import { useCallback, useState } from "react"

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

  return { image, pickImage }
}

export default useImage
