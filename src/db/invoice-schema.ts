import { relations } from "drizzle-orm";
import {
	index,
	pgTable,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "../../auth-schema";

export const businessDetails = pgTable("business_details", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id")
		.notNull() // ← cannot be null
		.unique() // ← one business per user
		.references(() => user.id, { onDelete: "cascade" }),
	businessName: text("business_name").notNull(),
	businessAddress: text("business_address").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const businessFields = pgTable(
	"business_fields",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		businessDetailsId: uuid("business_details_id")
			.notNull() // ← cannot be null
			.references(() => businessDetails.id, { onDelete: "cascade" }),
		field: text("field").notNull(),
		value: text("value").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow()
			.$onUpdate(() => new Date()),
	},
	(table) => [
		// Lookup index for joins/queries
		index("business_fields_business_details_id_idx").on(
			table.businessDetailsId,
		),
		// Prevents duplicate field names per business
		unique("business_fields_details_id_field_unique").on(
			table.businessDetailsId,
			table.field,
		),
	],
);

// ── Relations (enables db.query.* relational API) ──────────────────────────

export const businessDetailsRelations = relations(
	businessDetails,
	({ many }) => ({
		fields: many(businessFields),
	}),
);

export const businessFieldsRelations = relations(businessFields, ({ one }) => ({
	businessDetails: one(businessDetails, {
		fields: [businessFields.businessDetailsId],
		references: [businessDetails.id],
	}),
}));
