"use client"

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react"
import { Button } from "@ui/components/ui/button"
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
          <Button color="success" asChild>
            <Link href="/sign-in">{t("signIn")}</Link>
          </Button>
        </CardFooter>
      </Card>
    </Center>
  )
}

export default AuthWishlist
