ALTER TABLE "_WishlistShared" RENAME COLUMN "userId" TO "ownerId";--> statement-breakpoint
ALTER TABLE "_WishlistShared" RENAME COLUMN "sharedWithId" TO "viewerId";--> statement-breakpoint
ALTER TABLE "_WishlistShared" DROP CONSTRAINT "_WishlistShared_userId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "_WishlistShared" DROP CONSTRAINT "_WishlistShared_sharedWithId_User_id_fk";
--> statement-breakpoint
ALTER TABLE "_WishlistShared" DROP CONSTRAINT "_WishlistShared_userId_sharedWithId_pk";--> statement-breakpoint
ALTER TABLE "_WishlistShared" ADD CONSTRAINT "_WishlistShared_ownerId_viewerId_pk" PRIMARY KEY("ownerId","viewerId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_WishlistShared" ADD CONSTRAINT "_WishlistShared_ownerId_User_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_WishlistShared" ADD CONSTRAINT "_WishlistShared_viewerId_User_id_fk" FOREIGN KEY ("viewerId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
