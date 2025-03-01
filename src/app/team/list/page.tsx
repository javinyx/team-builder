import { TeamList } from "@/components/team/list";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Team Listing",
	description: "Have a look and edit your Pokémon teams!",
};

export default function TeamListPage() {
	return (
		<div>
			<h1>{metadata.title as string}</h1>
			<h3>{metadata.description as string}</h3>
			<TeamList />
		</div>
	);
}
