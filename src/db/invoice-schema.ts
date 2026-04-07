import {
    index,
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const businessDetails = pgTable("business_details", {
  id: uuid("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  businessName: text("business_name").notNull(),
  businessAddress: text("business_address").notNull(),
});

export const businessFields = pgTable(
  "business_fields",
  {
    id: uuid("id").primaryKey(),
    businessDetailsId: uuid("business_details_id").references(
      () => businessDetails.id,
      { onDelete: "cascade" },
    ),
    field: text("field").notNull(),
    value: text("value").notNull(),
  },
  (table) => [
    index("business_fields_business_details_id_idx").on(
      table.businessDetailsId,
    ),
  ],
);
