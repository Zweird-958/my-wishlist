import { skeletonVariants } from "@ui/components/ui/skeleton/theme"

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={skeletonVariants({ className })} {...props} />
)

export { Skeleton }
