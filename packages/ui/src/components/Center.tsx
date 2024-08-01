import type { ReactNode } from "react"

const Center = ({ children }: { children: ReactNode }) => (
  <div className="flex grow items-center justify-center">{children}</div>
)
export default Center
