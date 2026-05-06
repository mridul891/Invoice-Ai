import { integer, pgTable, real, uuid, varchar } from "drizzle-orm/pg-core";
import { invoicesTable } from "./invoice-schema";

export const invoiceItemsTable = pgTable("invoice_items", {
	id: uuid("id").primaryKey().defaultRandom(),
	invoiceId: uuid("invoice_id")
		.notNull()
		.references(() => invoicesTable.id, { onDelete: "cascade" }),
	name: varchar("name", { length: 255 }).notNull(),
	quantity: integer("quantity").notNull().default(1),
	unitPrice: real("unit_price").notNull(),
});
