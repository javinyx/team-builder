import type { Metadata } from "next";

import { TeamEdit } from "@/components/team/edit";
import { PageHeader } from "@/components/ui/header";

export const metadata: Metadata = {
	title: "Team Edit",
	description: "Edit your Pokémon team!",
};

type TeamEditParams = {
	"team-id": string;
};

export type TeamEditProps = {
	params: Promise<TeamEditParams>;
};

export default async function TeamEditPage({ params }: TeamEditProps) {
	const teamId = (await params)["team-id"];

	return (
		<div>
			<PageHeader
				title={metadata.title as string}
				description={metadata.description as string}
			/>
			<TeamEdit teamId={teamId} />
		</div>
	);
}
