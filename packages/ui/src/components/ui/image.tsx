import { cn } from "@ui/utils/ui"
import NextImage from "next/image"
import {
  type ComponentPropsWithoutRef,
  type ReactEventHandler,
  forwardRef,
  useMemo,
  useState,
} from "react"
import { type VariantProps, tv } from "tailwind-variants"

const imageVariants = tv({
  slots: {
    wrapper: "relative w-full h-full",
    img: "rounded-md h-full w-full object-cover",
  },
  variants: {
    isBlurred: {
      true: {
        img: "backdrop-blur-md",
      },
    },
    isLoading: {
      true: {
        img: "bg-muted animate-pulse",
      },
    },
  },
  defaultVariants: {
    isBlurred: false,
  },
})

export type ImageProps = {
  classNames?: {
    wrapper?: string
    img?: string
  }
} & ComponentPropsWithoutRef<typeof NextImage> &
  Omit<VariantProps<typeof imageVariants>, "isLoading">

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ className, onLoad, classNames, isBlurred, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true)
    const slots = useMemo(() => imageVariants({ isBlurred }), [isBlurred])

    const handleOnLoad: ReactEventHandler<HTMLImageElement> = (event) => {
      setIsLoading(false)

      if (onLoad) {
        onLoad(event)
      }
    }

    return (
      <div
        className={slots.wrapper({
          className: cn(className, classNames?.wrapper),
        })}
      >
        <NextImage
          fill
          ref={ref}
          className={slots.img({ isLoading, className: classNames?.img })}
          onLoad={handleOnLoad}
          {...props}
        />
      </div>
    )
  },
)
