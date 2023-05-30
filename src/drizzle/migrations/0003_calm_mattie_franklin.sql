ALTER TABLE "orders" DROP CONSTRAINT "orders_session_id_sessions_id_fk";

DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
