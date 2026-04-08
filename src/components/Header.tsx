import Link from "next/link";
import { NAV_LINKS, SITE_TITLE } from "@/constant/const";

export default function Header() {
	return (
		<div>
			<div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
				<Link
					href="/"
					className="flex shrink-0 items-center justify-center gap-3"
				>
					{/* <Image src={logo} alt="Logo" className="size-5 sm:size-6" /> */}
					<span className="hidden h-full text-lg leading-none font-medium min-[400px]:block">
						{SITE_TITLE}
					</span>
				</Link>
				<div className="flex items-center gap-4">
					<nav className="flex items-center gap-4 text-sm sm:gap-6">
						{NAV_LINKS.map((item) => (
							<Link
								href={item.href}
								className="text-foreground/60 hover:text-foreground capitalize transition-colors"
								key={item.href}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}
