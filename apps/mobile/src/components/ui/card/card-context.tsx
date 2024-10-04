import { createContext, useContext } from "react"

import type { UseCardProps } from "@/components/ui/card/use-card"

export type CardContextType = Pick<
  UseCardProps,
  "styles" | "children" | "radius" | "isFooterBlurred"
>

const CardContext = createContext<CardContextType>({} as CardContextType)

export const CardProvider = ({ children, ...props }: CardContextType) => (
  <CardContext.Provider value={props}>{children}</CardContext.Provider>
)

export const useCardContext = () => useContext(CardContext)
