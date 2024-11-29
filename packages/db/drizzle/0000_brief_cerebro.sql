DROP TABLE IF EXISTS "_prisma_migrations";

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_type 
        WHERE typname = 'Currency'
    ) THEN
        CREATE TYPE "public"."Currency" AS ENUM('DOLLAR', 'EURO', 'POUND');
    END IF;
END $$;

CREATE TABLE IF NOT EXISTS "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"passwordHash" text NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email"),
	CONSTRAINT "User_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Wish" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"link" text,
	"price" double precision NOT NULL,
	"currency" "Currency" DEFAULT 'DOLLAR' NOT NULL,
	"createdAt" timestamp (3) DEFAULT now(),
	"isPrivate" boolean DEFAULT false,
	"userId" integer NOT NULL
);

ALTER TABLE IF EXISTS "_WishlistShared" RENAME COLUMN "A" TO "userId";--> statement-breakpoint
ALTER TABLE IF EXISTS "_WishlistShared" RENAME COLUMN "B" TO "sharedWithId";--> statement-breakpoint
ALTER TABLE IF EXISTS "_WishlistShared" ADD CONSTRAINT "_WishlistShared_userId_sharedWithId_pk" PRIMARY KEY("userId","sharedWithId");

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_WishlistShared" (
	"userId" integer NOT NULL,
	"sharedWithId" integer NOT NULL,
	CONSTRAINT "_WishlistShared_userId_sharedWithId_pk" PRIMARY KEY("userId","sharedWithId")
);

--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Wish" ADD CONSTRAINT "Wish_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;