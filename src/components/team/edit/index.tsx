"use client";

import { MAX_TEAM_SIZE } from "@/utils/constants";
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

	const addPokemon = async () => {
		if (team?.pokemons.length >= MAX_TEAM_SIZE) {
			return alert(`You can't have more than ${MAX_TEAM_SIZE} Pokémon in your team!`);
		}

		const response = await fetch('/api/pokemon/random');
		const data = await response.json();
		setTeam({ ...team, pokemons: [...team.pokemons, { pokemon: data }] });
	};

	const removePokemon = (pokemonId: string) => {
		setTeam({
		...team,
		pokemons: team.pokemons.filter((tp: any) => tp.pokemon.id !== pokemonId),
		});
	};

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
			<button type="button" onClick={addPokemon}>Add Random Pokémon</button>
			<button type="button" onClick={saveChanges}>
				Save Team
			</button>
			<div>
				{team?.pokemons.map((tp: any) => (
					<div key={tp.pokemon.id}>
						<img src={tp.pokemon.sprite} alt={tp.pokemon.name} />
						<p>{tp.pokemon.name}</p>
						<button type="button" onClick={() => removePokemon(tp.pokemon.id)}>Remove</button>
					</div>
				))}
			</div>
		</div>
	);
}
