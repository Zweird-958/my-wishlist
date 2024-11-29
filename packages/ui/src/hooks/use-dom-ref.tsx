import { type Ref, type RefObject, useImperativeHandle, useRef } from "react"

const useDOMRef = <T extends HTMLElement>(
  ref?: RefObject<T | null> | Ref<T | null>,
) => {
  const domRef = useRef<T>(null)

  useImperativeHandle(ref, () => domRef.current)

  return domRef
}

export default useDOMRef
