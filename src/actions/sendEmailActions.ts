"use server";

import { Resend } from "resend";
import { InvoiceEmail } from "@/components/common/emails/emailTemplate";
import { type SendEmailSchemaType, sendEmailSchema } from "@/zod/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

type ActionResult =
	| { success: true; data: string }
	| { success: false; error: string };

export async function sendInvoiceEmail(
	params: SendEmailSchemaType,
): Promise<ActionResult> {
	const parsed = sendEmailSchema.safeParse(params);
	if (!parsed.success) {
		return { success: false, error: parsed.error.message };
	}

	const { data, error } = await resend.emails.send({
		from: `${params.businessName} <invoices@resend.dev>`,
		to: [params.to],
		subject: `Invoice ${params.invoiceNumber} from ${params.businessName} — ${params.amount}`,
		react: InvoiceEmail({
			clientName: params.clientName,
			businessName: params.businessName,
			invoiceNumber: params.invoiceNumber,
			amount: params.amount.toString(),
			dueDate: params.dueDate.toLocaleDateString(),
			viewLink: params.viewLink,
		}),
	});

	if (error) {
		console.error("[sendInvoiceEmail] Failed:", error);
		return { success: false, error: error.message };
	}

	console.log("[sendInvoiceEmail] Sent:", data);
	return { success: true, data: "Invoice email sent successfully" };
}
