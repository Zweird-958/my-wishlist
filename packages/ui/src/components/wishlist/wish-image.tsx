import { Image, type ImageProps } from "@ui/components/ui/image"

type Props = Pick<ImageProps, "src" | "alt">

const WishImage = (props: Props) => (
  <>
    <Image
      className="absolute z-10"
      classNames={{
        img: "object-contain",
      }}
      isBlurred
      {...props}
    />
    <Image {...props} />
  </>
)

export default WishImage
