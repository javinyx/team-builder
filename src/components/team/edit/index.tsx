"use client";

import type { Pokemon } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PokemonCard } from "@/components/ui/pokemon/card";
import type { TeamPokemonWithPokemon, TeamWithPokemon } from "@/types";
import { debounce } from "@/utils";
import { MAX_TEAM_SIZE } from "@/utils/constants";

type TeamEditProps = {
	teamId: string;
};

export function TeamEdit(props: TeamEditProps) {
	const [team, setTeam] = useState<TeamWithPokemon | null>(null);
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
		if (!team) return alert("Team not found!");

		if (team.pokemons.length >= MAX_TEAM_SIZE) {
			return alert(
				`You can't have more than ${MAX_TEAM_SIZE} Pokémon in your team!`,
			);
		}

		const response = await fetch("/api/pokemon/random");
		const data = (await response.json()) as Pokemon;

		setTeam({
			...team,
			pokemons: [
				...team.pokemons,
				{ pokemon: data, teamId: "", pokemonId: "" },
			],
		});
	};

	const removePokemon = (pokemonId: string) => {
		if (!team) return alert("Team not found!");

		setTeam({
			...team,
			pokemons:
				team?.pokemons.filter(
					(tp: { pokemon: { id: string } }) => tp.pokemon.id !== pokemonId,
				) || [],
		});
	};

	const saveTeam = async () => {
		if (!team) return alert("Team not found!");

		if (teamName.length === 0) {
			return alert("Please provide a name for your team!");
		}

		if (team.pokemons.length === 0) {
			return alert("Please add at least a Pokémon to your team!");
		}

		await fetch(`/api/team/${props.teamId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: teamName,
				pokemons: team.pokemons.map((tp: TeamPokemonWithPokemon) => tp.pokemon),
			}),
		});
		router.push("/team/list");
	};

	return (
		<div>
			<div className="flex flex-row gap-2 pb-6">
				<Button onClick={debounce(() => addPokemon())}>
					Gotta Catch 'Em All
				</Button>
				<Input value={teamName} onChange={(e) => setTeamName(e.target.value)} />
				<Button onClick={saveTeam}>Save Team</Button>
			</div>
			<div className="flex flex-col gap-6">
				{team?.pokemons.map((tp: TeamPokemonWithPokemon) => (
					<div key={tp.pokemon.id}>
						<PokemonCard pokemon={tp.pokemon}>
							<Button onClick={() => removePokemon(tp.pokemon.id)}>
								Remove
							</Button>
						</PokemonCard>
					</div>
				))}
			</div>
		</div>
	);
}
