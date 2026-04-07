import { Button } from "@/components/ui/button";

export default function CreateInvoiceView() {
	return (
		<div className="">
			<div>
				<Button variant="outline" size="sm">
					Create Invoice
				</Button>
				<Button variant="outline" size="sm">
					Download
				</Button>
			</div>
			<div className="grid-cols-2">
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
