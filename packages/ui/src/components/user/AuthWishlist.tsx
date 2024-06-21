"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react"
import Link from "next/link"

import Center from "../Center"

type Props = {
  header: string
  body: string
  button: string
}

const AuthWishlist = ({ header, body, button }: Props) => (
  <Center>
    <Card className="max-w-lg w-full">
      <CardHeader>{header}</CardHeader>
      <CardBody>
        <p>{body}</p>
      </CardBody>
      <CardFooter className="justify-end">
        <Button as={Link} href="/sign-in" color="success">
          {button}
        </Button>
      </CardFooter>
    </Card>
  </Center>
)

export default AuthWishlist
