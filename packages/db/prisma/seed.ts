import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const main = async () => {
  await Promise.all(
    [...new Array(10)].map(async () => {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
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
