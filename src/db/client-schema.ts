import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { businessesTable } from "./business-schema";

export const clientsTable = pgTable("clients", {
	id: uuid("id").primaryKey().defaultRandom(),
	businessId: uuid("business_id")
		.notNull()
		.references(() => businessesTable.id, { onDelete: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	address: varchar("address", { length: 500 }).notNull(),
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
