import TeamEditForm from "@/components/team/edit";
import type { Metadata } from "next";

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
			<h1>{metadata.title as string}</h1>
			<h3>{metadata.description as string}</h3>
			<TeamEditForm teamId={teamId} />
		</div>
	);
}
