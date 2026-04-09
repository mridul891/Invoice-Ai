ALTER TABLE "business_details" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "business_details" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "business_fields" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "business_fields" ALTER COLUMN "business_details_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "business_details" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "business_details" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "business_fields" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "business_fields" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "business_details" ADD CONSTRAINT "business_details_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_details_id_field_unique" UNIQUE("business_details_id","field");