import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Providers = (props: Props) => {
  const { children } = props

  return children
}

export default Providers
