"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import Link from "next/link"

import { useTranslation } from "@my-wishlist/i18n"

import Center from "@/components/ui/Center"

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
