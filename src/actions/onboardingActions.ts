"use server";

import { user } from "auth-schema";
import { eq } from "drizzle-orm";
import { businessesTable } from "@/db/business-schema";
import {
	OnboardingFormSchema,
	type OnboardingFormSchemaType,
} from "@/zod/schema";
import { db } from "../index";
import { getSession } from "./authActions";

type ActionResult<T> =
	| { success: true; message: string; data?: T }
	| { success: false; error: string; code?: string };

export async function handleOnboarding(
	rawData: OnboardingFormSchemaType,
): Promise<ActionResult<{ businessId: string }>> {
	const parsed = OnboardingFormSchema.safeParse(rawData);
	if (!parsed.success) {
		return {
			success: false,
			error: "Invalid input",
			code: "VALIDATION_ERROR",
		};
	}
	const { businessName, businessAddress, businessFieldsArray } = parsed.data;

	const session = await getSession();
	if (!session?.user?.id) {
		return { success: false, error: "Unauthorized", code: "UNAUTHORIZED" };
	}

	if (session.user.isOnboardingCompleted) {
		return {
			success: false,
			error: "Onboarding already completed",
			code: "ALREADY_ONBOARDED",
		};
	}

	const userId = session.user.id;

	const metadata = Object.fromEntries(
		businessFieldsArray.map((field) => [field.label, field.value]),
	);

	try {
		await db.transaction(async (tx) => {
			await tx.insert(businessesTable).values({
				ownerUserId: userId,
				businessName,
				businessAddress,
				metadata,
			});

			await tx
				.update(user)
				.set({ isOnboardingCompleted: true })
				.where(eq(user.id, userId));
		});
	} catch (err) {
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
