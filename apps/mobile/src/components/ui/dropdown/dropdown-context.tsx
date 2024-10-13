import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
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

type Measurements = {
  width: number
  height: number
  x: number
  y: number
}

type DropdownContextType = {
  open: boolean
  hideDropdown: () => void
  showDropdown: () => void
  scaleStyle: ReturnType<typeof useAnimatedStyle>
  measure: Measurements | null
  setMeasure: Dispatch<SetStateAction<Measurements | null>>
  toggleDropdown: () => void
} & Omit<DropdownContextProps, "children">

const DropdownContext = createContext<DropdownContextType>(
  {} as DropdownContextType,
)

export type Item = {
  value: string
  label: string
}

export type DropdownContextProps = {
  children: ReactNode
  gap: number
  onChange: (newValue: Item) => void
}

export const DropdownProvider = ({
  children,
  ...props
}: DropdownContextProps) => {
  const [open, setOpen] = useState(false)
  const [measure, setMeasure] = useState<Measurements | null>(null)
  const scaleDownAnimation = useSharedValue(0)

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scaleDownAnimation.value,
      },
    ],
  }))

  const showDropdown = useCallback(() => {
    setOpen(true)

    scaleDownAnimation.value = withSpring(1)
  }, [scaleDownAnimation])

  const hideDropdown = useCallback(() => {
    scaleDownAnimation.value = withSpring(0, {}, () => {
      runOnJS(setOpen)(false)
    })
  }, [scaleDownAnimation])

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => {
      if (prev) {
        hideDropdown()

        return prev
      }

      showDropdown()

      return true
    })
  }, [hideDropdown, showDropdown])

  useEffect(() => {
    if (open) {
      showDropdown()

      return
    }

    hideDropdown()
  }, [hideDropdown, open, showDropdown])

  return (
    <DropdownContext.Provider
      value={{
        open,
        showDropdown,
        hideDropdown,
        scaleStyle,
        measure,
        setMeasure,
        toggleDropdown,
        ...props,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

export const useDropdownContext = () => useContext(DropdownContext)
