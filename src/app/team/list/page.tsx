import type { Metadata } from "next";

import { TeamList } from "@/components/team/list";
import { PageHeader } from "@/components/ui/page/header";

export const metadata: Metadata = {
	title: "Team Listing",
	description: "Have a look at your Pokémon teams!",
};

export default function TeamListPage() {
	return (
		<div>
			<PageHeader
				title={metadata.title as string}
				description={metadata.description as string}
			/>
			<TeamList />
		</div>
	);
}
