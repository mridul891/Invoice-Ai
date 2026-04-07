import type { IconMap, SocialLink } from "@/types/types";

export const SITE_TITLE = "AIINVOICE";

export const NAV_LINKS: SocialLink[] = [];

export const SOCIAL_LINKS: SocialLink[] = [
	{
		href: "https://github.com/jktrn",
		label: "GitHub",
	},
	{
		href: "https://twitter.com/enscry",
		label: "Twitter",
	},
	{
		href: "mailto:jason@enscribe.dev",
		label: "Email",
	},
	{
		href: "/rss.xml",
		label: "RSS",
	},
];

export const ICON_MAP: IconMap = {
	Website: "lucide:globe",
	GitHub: "lucide:github",
	LinkedIn: "lucide:linkedin",
	Twitter: "lucide:twitter",
	Email: "lucide:mail",
	RSS: "lucide:rss",
};
