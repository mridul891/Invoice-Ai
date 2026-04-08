CREATE TABLE "business_details" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text,
	"business_name" text NOT NULL,
	"business_address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "business_fields" (
	"id" uuid PRIMARY KEY NOT NULL,
	"business_details_id" uuid,
	"field" text NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "onboarding_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "business_details" ADD CONSTRAINT "business_details_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_business_details_id_business_details_id_fk" FOREIGN KEY ("business_details_id") REFERENCES "public"."business_details"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "business_fields_business_details_id_idx" ON "business_fields" USING btree ("business_details_id");