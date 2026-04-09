"use server";

import { user } from "auth-schema";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { businessDetails, businessFields } from "@/db/invoice-schema";
import { auth } from "@/lib/auth";
import {
	OnboardingFormSchema,
	type OnboardingFormSchemaType,
} from "@/zod/schema";
import { db } from "../index";

type ActionResult<T> =
	| { success: true; message: string; data?: T }
	| { success: false; error: string; code?: string };

export async function handleOnboarding(
	rawData: OnboardingFormSchemaType,
): Promise<ActionResult<{ businessDetailsId: string }>> {
	// 1. Runtime input validation
	const parsed = OnboardingFormSchema.safeParse(rawData);
	if (!parsed.success) {
		return {
			success: false,
			error: "Invalid input",
			code: "VALIDATION_ERROR",
		};
	}
	const { businessName, businessAddress, businessFieldsArray } = parsed.data;

	// 2. Auth check with forwarded headers (required in Next.js)
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session?.user?.id) {
		return { success: false, error: "Unauthorized", code: "UNAUTHORIZED" };
	}

	// 3. Guard: prevent re-onboarding
	if (session.user.isOnboardingCompleted) {
		return {
			success: false,
			error: "Onboarding already completed",
			code: "ALREADY_ONBOARDED",
		};
	}

	const userId = session.user.id;
	// const businessDetailsId = randomUUID().toString();

	// 4. Wrap all writes in a single transaction (atomic)
	try {
		await db.transaction(async (tx) => {
			const [inserted] = await tx
				.insert(businessDetails)
				.values({
					userId,
					businessName,
					businessAddress,
				})
				.returning({ id: businessDetails.id });

			if (businessFieldsArray.length > 0) {
				await tx.insert(businessFields).values(
					businessFieldsArray.map((field) => ({
						businessDetailsId: inserted.id,
						field: field.label,
						value: field.value,
					})),
				);
			}

			await tx
				.update(user)
				.set({ isOnboardingCompleted: true })
				.where(eq(user.id, userId));
		});
	} catch (err) {
		// 5. Log server-side, return safe message to client
		console.error("[handleOnboarding] DB transaction failed:", err);
		return {
			success: false,
			error: "Failed to save business details. Please try again.",
			code: "DB_ERROR",
		};
	}

	return {
		success: true,
		message: "Business details saved successfully",
	};
}
