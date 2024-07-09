import { useTranslation } from "@my-wishlist/i18n/desktop"
import Home from "@my-wishlist/ui/pages/Home"

const HomePage = () => {
  // NECESSARY TO LOAD NAMESPACES
  const { t: _ } = useTranslation("forms", "zodErrors", "errors")

  return <Home />
}

export default HomePage
