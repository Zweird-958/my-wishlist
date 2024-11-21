import { type VariantProps, tv } from "tailwind-variants"

export const imageVariants = tv({
  slots: {
    wrapper: "relative h-full w-full",
    img: "h-full w-full rounded-md object-cover",
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

export type ImageVariantsProps = VariantProps<typeof imageVariants>
