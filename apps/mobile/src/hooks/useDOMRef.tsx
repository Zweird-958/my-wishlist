import { type Ref, type RefObject, useImperativeHandle, useRef } from "react"
import type {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native"

type NativeComponents =
  | View
  | ScrollView
  | Text
  | TextInput
  | Image
  | Modal
  | Element

const useDOMRef = <T extends NativeComponents>(
  ref?: RefObject<T | null> | Ref<T | null>,
) => {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current)

  return domRef
}

export default useDOMRef
