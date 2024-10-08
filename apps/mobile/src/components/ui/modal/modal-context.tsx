import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

import type useModal from "@/components/ui/modal/use-modal"

type ModalContextType = {
  open: boolean
  hideModal: () => void
  showModal: () => void
  scaleStyle: ReturnType<typeof useAnimatedStyle>
} & Omit<ReturnType<typeof useModal>, "open" | "setOpen" | "onOpen">

const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export type ModalContextProps = {
  children: ReactNode
} & ReturnType<typeof useModal>

export const ModalProvider = ({
  children,
  open,
  setOpen: setOpenProp,
  onOpen,
  ...props
}: ModalContextProps) => {
  const [baseOpen, baseSetOpen] = useState(false)
  const scaleDownAnimation = useSharedValue(0)

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scaleDownAnimation.value,
      },
    ],
  }))

  const showModal = useCallback(() => {
    setOpenProp?.(true)
    baseSetOpen(true)
    onOpen?.()

    scaleDownAnimation.value = withSpring(1)
  }, [setOpenProp, onOpen, scaleDownAnimation])

  const hideModal = useCallback(() => {
    scaleDownAnimation.value = withSpring(0, {}, () => {
      if (setOpenProp) {
        runOnJS(setOpenProp)(false)
      }

      runOnJS(baseSetOpen)(false)
    })
  }, [scaleDownAnimation, setOpenProp])

  useEffect(() => {
    if (open) {
      showModal()

      return
    }

    hideModal()
  }, [hideModal, open, showModal])

  return (
    <ModalContext.Provider
      value={{
        open: baseOpen,
        showModal,
        hideModal,
        scaleStyle,
        ...props,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
