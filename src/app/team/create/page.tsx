import { TeamCreate } from "@/components/team/create";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Create Team",
	description: "Create your Pokémon team!",
};

export default function TeamCreatePage() {
	return (
		<div>
			<h1>{metadata.title as string}</h1>
			<h3>{metadata.description as string}</h3>
			<TeamCreate />
		</div>
	);
}
