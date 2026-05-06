import { account, session, user } from "auth-schema";
import { relations } from "drizzle-orm";
import { businessesTable } from "./business-schema";
import { clientsTable } from "./client-schema";
import { invoiceItemsTable } from "./invoice-item-schema";
import { invoicesTable } from "./invoice-schema";

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	businesses: many(businessesTable),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const businessRelations = relations(
	businessesTable,
	({ one, many }) => ({
		owner: one(user, {
			fields: [businessesTable.ownerUserId],
			references: [user.id],
		}),

		clients: many(clientsTable),

		invoices: many(invoicesTable),
	}),
);

export const clientRelations = relations(clientsTable, ({ one, many }) => ({
	business: one(businessesTable, {
		fields: [clientsTable.businessId],
		references: [businessesTable.id],
	}),

	invoices: many(invoicesTable),
}));

export const invoiceRelations = relations(invoicesTable, ({ one, many }) => ({
	business: one(businessesTable, {
		fields: [invoicesTable.businessId],
		references: [businessesTable.id],
	}),

	client: one(clientsTable, {
		fields: [invoicesTable.clientId],
		references: [clientsTable.id],
	}),

	items: many(invoiceItemsTable),
}));

export const invoiceItemRelations = relations(invoiceItemsTable, ({ one }) => ({
	invoice: one(invoicesTable, {
		fields: [invoiceItemsTable.invoiceId],
		references: [invoicesTable.id],
	}),
}));
