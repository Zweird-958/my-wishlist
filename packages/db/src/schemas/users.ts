import { relations } from "drizzle-orm"
import { pgTable, serial, text } from "drizzle-orm/pg-core"

import { wishes, wishlistShared } from "./wishes"

export const users = pgTable("User", {
  id: serial().primaryKey(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  passwordHash: text().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  wishlist: many(wishes, { relationName: "wishlist" }),
  viewers: many(wishlistShared, { relationName: "wishlistOwner" }),
  accessibleWishlists: many(wishlistShared, { relationName: "wishlistViewer" }),
}))
