import { relations } from "drizzle-orm"
import {
  boolean,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

import { currencies } from "@my-wishlist/config"

import { users } from "./users"

export const currencyEnum = pgEnum("Currency", currencies)

export const wishes = pgTable("Wish", {
  id: serial().primaryKey(),
  name: text().notNull(),
  image: text(),
  link: text(),
  price: doublePrecision().notNull(),
  currency: currencyEnum().notNull().default("DOLLAR"),
  createdAt: timestamp({ precision: 3 }).notNull().defaultNow(),
  isPrivate: boolean().notNull().default(false),
  userId: integer()
    .notNull()
    .references(() => users.id),
})

export const wishesRelations = relations(wishes, ({ one }) => ({
  user: one(users, {
    fields: [wishes.userId],
    references: [users.id],
    relationName: "wishlist",
  }),
}))

export const wishlistShared = pgTable(
  "_WishlistShared",
  {
    ownerId: integer()
      .notNull()
      .references(() => users.id),
    viewerId: integer()
      .notNull()
      .references(() => users.id),
  },
  (table) => [primaryKey({ columns: [table.ownerId, table.viewerId] })],
)

export const wishlistSharedRelations = relations(wishlistShared, ({ one }) => ({
  owner: one(users, {
    fields: [wishlistShared.ownerId],
    references: [users.id],
    relationName: "wishlistOwner",
  }),
  viewer: one(users, {
    fields: [wishlistShared.viewerId],
    references: [users.id],
    relationName: "wishlistViewer",
  }),
}))
