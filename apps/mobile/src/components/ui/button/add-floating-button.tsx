import { Plus } from "lucide-react-native"

import { useTheme } from "@/components/contexts/ThemeContext"
import { Button, type ButtonProps } from "@/components/ui/button"

type Props = Required<Pick<ButtonProps, "onPress">>

const AddFloatingButton = ({ onPress }: Props) => {
  const { tw } = useTheme()

  return (
    <Button style={tw.style("absolute bottom-8 right-6")} onPress={onPress}>
      <Plus color={tw.color("primary-foreground")} />
    </Button>
  )
}

export default AddFloatingButton
