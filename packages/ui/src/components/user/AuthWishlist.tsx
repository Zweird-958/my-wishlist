"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import Link from "next/link"

import { useTranslation } from "../AppContext"
import Center from "../Center"

const AuthWishlist = () => {
  const { t } = useTranslation()

  return (
    <Center>
      <Card className="w-full max-w-lg">
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
