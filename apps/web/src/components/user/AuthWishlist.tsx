import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from "@nextui-org/react"

import Center from "@my-wishlist/ui/ui/Center"

import { useTranslation } from "@/app/i18n/client"

const AuthWishlist = () => {
  const { t } = useTranslation()

  return (
    <Center>
      <Card className="max-w-lg w-full">
        <CardHeader>{t("notLogged")}</CardHeader>
        <CardBody>
          <p>{t("mustLoggedIn")}</p>
        </CardBody>
        <CardFooter className="justify-end">
          <Button as={Link} href="/sign-in" color="success">
            {t("signIn")}
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthWishlist
