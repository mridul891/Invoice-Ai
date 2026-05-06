import { user } from "auth-schema";
import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const businessesTable = pgTable("businesses", {
	id: uuid("id").primaryKey().defaultRandom(),
	ownerUserId: varchar("owner_user_id", { length: 255 })
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: "cascade" }),
	businessName: varchar("business_name", { length: 255 }).notNull(),
	businessAddress: varchar("business_address", { length: 500 }).notNull(),
	metadata: jsonb("metadata").$type<Record<string, string>>(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
