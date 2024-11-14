import { type SQL, sql } from "drizzle-orm"
import type { AnyPgColumn } from "drizzle-orm/pg-core"

export const lower = (value: AnyPgColumn): SQL => sql`lower(${value})`
