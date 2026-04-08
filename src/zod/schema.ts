import { z } from "zod";
export const FieldSchema = z.object({
  label: z.string().min(1, "Business field label is required."),
  value: z.string().min(1, "Business field value is required."),
});
export const OnboardingFormSchema = z.object({
  businessName: z
    .string()
    .min(5, "Business name must be at least 5 characters.")
    .max(32, "Business name must be at most 32 characters."),
  businessAddress: z
    .string()
    .min(20, "Business address must be at least 20 characters.")
    .max(100, "Business address must be at most 100 characters."),

  businessFieldsArray: z
    .array(FieldSchema)
    .min(1, "Business fields are required."),
});

export type FieldSchemaType = z.infer<typeof FieldSchema>;
export type OnboardingFormSchemaType = z.infer<typeof OnboardingFormSchema>;
