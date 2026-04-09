"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { handleOnboarding } from "@/actions/onboardingActions";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";
import {
	OnboardingFormSchema,
	type OnboardingFormSchemaType,
} from "@/zod/schema";

const FORM_ID = "onboarding-form";

export default function OnboardingView() {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const form = useForm<OnboardingFormSchemaType>({
		resolver: zodResolver(OnboardingFormSchema),
		defaultValues: {
			businessName: "",
			businessAddress: "",
			businessFieldsArray: [{ label: "", value: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "businessFieldsArray",
	});

	const isSubmitting = form.formState.isSubmitting || isPending;

	function onSubmit(data: OnboardingFormSchemaType) {
		startTransition(async () => {
			const response = await handleOnboarding(data);

			if (response.success) {
				toast.success("Business details saved successfully.");
				router.push("/dashboard");
				return;
			}

			// Already onboarded — silently redirect instead of showing an error
			if (response.code === "ALREADY_ONBOARDED") {
				router.push("/dashboard");
				return;
			}

			toast.error(response.error ?? "Something went wrong. Please try again.");
		});
	}

	return (
		<Card className="w-full sm:max-w-md">
			<CardHeader>
				<CardTitle>Onboarding Form</CardTitle>
				<CardDescription>
					Help us improve by filling out the form below.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form id={FORM_ID} onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						{/* ── Business Name ─────────────────────────────────── */}
						<Controller
							name="businessName"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="onboarding-business-name">
										Business Name
									</FieldLabel>
									<Input
										{...field}
										id="onboarding-business-name"
										aria-invalid={fieldState.invalid}
										placeholder="Acme Inc."
										autoComplete="organization"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* ── Business Address ──────────────────────────────── */}
						<Controller
							name="businessAddress"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="onboarding-business-address">
										Business Address
									</FieldLabel>
									<InputGroup>
										<InputGroupTextarea
											{...field}
											id="onboarding-business-address"
											placeholder="123 Main St, City, Country"
											rows={4}
											className="min-h-24 resize-none"
											aria-invalid={fieldState.invalid}
											autoComplete="street-address"
										/>
										<InputGroupAddon align="block-end">
											<InputGroupText className="tabular-nums">
												{field.value.length}/100 characters
											</InputGroupText>
										</InputGroupAddon>
									</InputGroup>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						{/* ── Dynamic Fields ────────────────────────────────── */}
						{fields.map((item, index) => (
							<FieldGroup key={item.id}>
								<div className="flex items-end gap-2">
									<div className="flex gap-2">
										<Controller
											name={`businessFieldsArray.${index}.label`}
											control={form.control}
											render={({ field, fieldState }) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel
														htmlFor={`onboarding-field-label-${index}`}
													>
														Label
													</FieldLabel>
													<Input
														{...field}
														id={`onboarding-field-label-${index}`}
														aria-invalid={fieldState.invalid}
														placeholder="e.g. GST Number"
														autoComplete="off"
														className="rounded-sm py-5"
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>

										<Controller
											name={`businessFieldsArray.${index}.value`}
											control={form.control}
											render={({ field, fieldState }) => (
												<Field data-invalid={fieldState.invalid}>
													<FieldLabel
														htmlFor={`onboarding-field-value-${index}`}
													>
														Value
													</FieldLabel>
													<Input
														{...field}
														id={`onboarding-field-value-${index}`}
														aria-invalid={fieldState.invalid}
														placeholder="e.g. 22AAAAA0000A1Z5"
														autoComplete="off"
														className="rounded-sm py-5"
													/>
													{fieldState.invalid && (
														<FieldError errors={[fieldState.error]} />
													)}
												</Field>
											)}
										/>
									</div>

									<Button
										type="button"
										variant="outline"
										// Prevent removing the last field
										disabled={fields.length === 1}
										onClick={() => remove(index)}
										className="rounded-sm border border-dotted border-gray-700 text-sm text-gray-500"
										aria-label={`Remove field ${index + 1}`}
									>
										Remove
									</Button>
								</div>
							</FieldGroup>
						))}

						<Button
							type="button"
							variant="outline"
							onClick={() => append({ label: "", value: "" })}
							className="rounded-sm border border-dotted border-gray-700 text-sm text-gray-500"
						>
							+ Add Field
						</Button>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter>
				<Field orientation="horizontal">
					<Button
						type="button"
						variant="outline"
						disabled={isSubmitting}
						onClick={() => form.reset()}
					>
						Reset
					</Button>
					<Button type="submit" form={FORM_ID} disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
