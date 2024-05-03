import { Button, ButtonProps } from "@nextui-org/react"
import { Plus } from "lucide-react"

type Props = Pick<Required<ButtonProps>, "onPress"> & Pick<ButtonProps, "color">

const AddButton = ({ onPress, color }: Props) => (
  <Button
    className="fixed bottom-6 right-6 z-20"
    color={color}
    isIconOnly
    onPress={onPress}
  >
    <Plus />
  </Button>
)

export default AddButton
