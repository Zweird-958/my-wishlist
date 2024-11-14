import type { users, wishes } from "@my-wishlist/db"

export type User = typeof users.$inferSelect
export type WishTable = typeof wishes.$inferSelect
