import {
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { businessesTable } from "./business-schema";
import { clientsTable } from "./client-schema";

export const invoiceStatusEnum = pgEnum("invoice_status", [
	"draft",
	"sent",
	"paid",
	"overdue",
	"cancelled",
]);

export const invoicesTable = pgTable("invoices", {
	id: uuid("id").primaryKey().defaultRandom(),
	businessId: uuid("business_id")
		.notNull()
		.references(() => businessesTable.id),
	clientId: uuid("client_id")
		.notNull()
		.references(() => clientsTable.id),
	invoiceNumber: varchar("invoice_number", { length: 50 }).notNull(),
	status: invoiceStatusEnum("status").default("draft").notNull(),
	issueDate: timestamp("issue_date").defaultNow().notNull(),
	dueDate: timestamp("due_date").notNull(),
	notes: text("notes"),
	taxRate: real("tax_rate").default(0).notNull(),
	subtotal: real("subtotal").default(0).notNull(),
});
