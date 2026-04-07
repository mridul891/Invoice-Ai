import type React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function InvoicesLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	);
}
