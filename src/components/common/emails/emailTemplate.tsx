import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

interface InvoiceEmailProps {
	clientName?: string;
	businessName?: string;
	invoiceNumber?: string;
	amount?: string;
	dueDate?: string;
	viewLink?: string;
	customMessage?: string;
}

export const InvoiceEmail = ({
	clientName = "Client",
	businessName = "Your Business",
	invoiceNumber = "INV-001",
	amount = "£0.00",
	dueDate = "N/A",
	viewLink = "#",
	customMessage,
}: InvoiceEmailProps) => {
	const previewText = `Invoice ${invoiceNumber} from ${businessName} — ${amount} due ${dueDate}`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-[#f4f4f5] my-auto mx-auto font-sans px-2">
					<Container className="bg-white border border-solid border-[#e4e4e7] rounded-xl my-[40px] mx-auto p-[32px] max-w-[480px]">
						<Heading className="text-[#18181b] text-[22px] font-semibold text-center p-0 mt-0 mb-[24px] mx-0">
							{businessName}
						</Heading>

						<Hr className="border-[#e4e4e7] my-0 mx-0 w-full" />

						<Text className="text-[#18181b] text-[15px] leading-[24px] mt-[24px]">
							Hi {clientName},
						</Text>

						{customMessage ? (
							<Text className="text-[#3f3f46] text-[14px] leading-[22px]">
								{customMessage}
							</Text>
						) : (
							<Text className="text-[#3f3f46] text-[14px] leading-[22px]">
								A new invoice has been created for you. Please review the
								details below and complete the payment by the due date.
							</Text>
						)}

						<Section className="bg-[#fafafa] border border-solid border-[#e4e4e7] rounded-lg p-[20px] my-[24px]">
							<Text className="text-[#71717a] text-[12px] uppercase tracking-wider font-medium m-0 mb-[4px]">
								Invoice
							</Text>
							<Text className="text-[#18181b] text-[16px] font-semibold m-0 mb-[16px]">
								{invoiceNumber}
							</Text>

							<Text className="text-[#71717a] text-[12px] uppercase tracking-wider font-medium m-0 mb-[4px]">
								Amount Due
							</Text>
							<Text className="text-[#18181b] text-[24px] font-bold m-0 mb-[16px]">
								{amount}
							</Text>

							<Text className="text-[#71717a] text-[12px] uppercase tracking-wider font-medium m-0 mb-[4px]">
								Due Date
							</Text>
							<Text className="text-[#18181b] text-[16px] font-semibold m-0">
								{dueDate}
							</Text>
						</Section>

						<Section className="text-center mt-[8px] mb-[32px]">
							<Button
								className="bg-[#18181b] rounded-lg text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
								href={viewLink}
							>
								View Invoice
							</Button>
						</Section>

						<Text className="text-[#71717a] text-[13px] leading-[20px]">
							Or copy and paste this URL into your browser:{" "}
							<Link href={viewLink} className="text-[#2563eb] underline">
								{viewLink}
							</Link>
						</Text>

						<Hr className="border-[#e4e4e7] my-[24px] mx-0 w-full" />

						<Text className="text-[#a1a1aa] text-[12px] leading-[18px] text-center m-0">
							This invoice was sent by {businessName} via{" "}
							<Link
								href="https://invoiceai.app"
								className="text-[#a1a1aa] underline"
							>
								InvoiceAI
							</Link>
							. If you believe this was sent in error, please contact{" "}
							{businessName} directly.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default InvoiceEmail;
