import { faker } from "@faker-js/faker"
import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import { users, wishes } from "./schemas"
import hashPassword from "./utils/hashPassword"

if (!("DATABASE_URL" in process.env)) {
  throw new Error("DATABASE_URL not found on .env")
}

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  const db = drizzle(client)

  await Promise.all(
    [...new Array<unknown>(2)].map(async (_, index) => {
      const [user] = await db
        .insert(users)
        .values({
          email: `seed${index}@my-wishlist.fr`,
          passwordHash: hashPassword("password"),
          username: `seed${index}`,
        })
        .returning()

      if (!user) {
        throw new Error("User not created")
      }

      await Promise.all(
        [...new Array<unknown>(10)].map(async () => {
          await db.insert(wishes).values({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price({ min: 1, max: 100 }), 10),
            userId: user.id,
            link: faker.internet.url(),
          })
        }),
      )
    }),
  )
}

main()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Seed done !!")
    process.exit(0)
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
