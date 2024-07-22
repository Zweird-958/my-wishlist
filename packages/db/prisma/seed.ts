import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

import hashPassword from "../src/utils/hashPassword"

const prisma = new PrismaClient()
const main = async () => {
  const user = await prisma.user.create({
    data: {
      email: "seed@my-wishlist.fr",
      passwordHash: hashPassword("password"),
      username: "seed",
    },
  })

  await Promise.all(
    [...new Array<unknown>(10)].map(async () => {
      await prisma.wish.create({
        data: {
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price({ min: 1, max: 100 }), 10),
          userId: user.id,
          link: faker.internet.url(),
        },
      })
    }),
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
