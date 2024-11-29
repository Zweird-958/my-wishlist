"use client"

import {
  type DialogVariantsProps,
  dialogVariants,
} from "@ui/components/ui/dialog/theme"
import { type ReactNode, createContext, useContext, useMemo } from "react"

type DialogContextType = {
  slots: ReturnType<typeof dialogVariants>
}

export const DialogContext = createContext<DialogContextType>(
  {} as DialogContextType,
)

type DialogProps = Pick<DialogVariantsProps, "shadow"> & { children: ReactNode }

export const DialogProvider = ({ children, shadow }: DialogProps) => {
  const slots = useMemo(() => dialogVariants({ shadow }), [shadow])

  return (
    <DialogContext.Provider value={{ slots }}>
      {children}
    </DialogContext.Provider>
  )
}

export const useDialogContext = () => useContext(DialogContext)
