import { ReactNode } from "react"

const Center = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center grow">{children}</div>
)
export default Center
