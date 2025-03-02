import type { Metadata } from "next";

import { TeamCreate } from "@/components/team/create";
import { PageHeader } from "@/components/ui/page/header";

export const metadata: Metadata = {
	title: "Create Team",
	description: "Create your Pokémon team!",
};

export default function TeamCreatePage() {
	return (
		<div>
			<PageHeader
				title={metadata.title as string}
				description={metadata.description as string}
			/>
			<TeamCreate />
		</div>
	);
}
