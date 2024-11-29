import { useNavbarMenuContext } from "@ui/components/ui/navbar/context"
import {
  menuIconBottomVariants,
  menuIconCenterVariants,
  menuIconTopVariants,
} from "@ui/components/ui/navbar/theme"
import { type SVGMotionProps, motion } from "framer-motion"

type Props = {
  width?: number
  height?: number
}

const STATIC_LINE_PROPS: SVGMotionProps<SVGLineElement> = {
  className: "stroke-foreground",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke",
  initial: "closed",
  transition: { type: "spring", stiffness: 260, damping: 20 },
  strokeLinecap: "round",
}

const MenuIcon = ({ width = 18, height = 14 }: Props) => {
  const { isOpen } = useNavbarMenuContext()
  const variant = isOpen ? "opened" : "closed"
  const lineProps: SVGMotionProps<SVGLineElement> = {
    ...STATIC_LINE_PROPS,
    animate: variant,
  }
  const unitHeight = 4
  const unitWidth = (unitHeight * width) / height

  return (
    <motion.svg
      viewBox={`0 0 ${unitWidth} ${unitHeight}`}
      overflow="visible"
      preserveAspectRatio="none"
      width={width}
      height={height}
    >
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="0"
        y2="0"
        variants={menuIconTopVariants}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="2"
        y2="2"
        variants={menuIconCenterVariants}
        {...lineProps}
      />
      <motion.line
        x1="0"
        x2={unitWidth}
        y1="4"
        y2="4"
        variants={menuIconBottomVariants}
        {...lineProps}
      />
    </motion.svg>
  )
}

export default MenuIcon
