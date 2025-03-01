"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TeamEditFormProps = {
	teamId: string;
};

export default function TeamEditForm(props: TeamEditFormProps) {
	const [team, setTeam] = useState(null);
	const [teamName, setTeamName] = useState("");

	const router = useRouter();

	useEffect(() => {
		fetch(`/api/team/${props.teamId}`)
			.then((res) => res.json())
			.then((data) => {
				setTeam(data);
				setTeamName(data.name);
			});
	}, [props.teamId]);

	const saveChanges = async () => {
		await fetch(`/api/team/${props.teamId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: teamName,
				pokemons: team.pokemons.map((tp: any) => tp.pokemon),
			}),
		});
		router.push("/team/list");
	};

	return (
		<div>
			<input
				type="text"
				value={teamName}
				onChange={(e) => setTeamName(e.target.value)}
			/>
			<button type="button" onClick={saveChanges}>
				Save Team
			</button>
			<div>
				{team?.pokemons.map((tp: any) => (
					<div key={tp.pokemon.id}>
						<img src={tp.pokemon.sprite} alt={tp.pokemon.name} />
						<p>{tp.pokemon.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
