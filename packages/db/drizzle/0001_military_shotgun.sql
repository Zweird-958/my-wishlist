DO $$ BEGIN
 ALTER TABLE "_WishlistShared" ADD CONSTRAINT "_WishlistShared_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_WishlistShared" ADD CONSTRAINT "_WishlistShared_sharedWithId_User_id_fk" FOREIGN KEY ("sharedWithId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
