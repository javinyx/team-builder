"use client";

import type { Pokemon } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PokemonCard } from "@/components/ui/pokemon/card";
import { MAX_TEAM_SIZE } from "@/utils/constants";

export function TeamCreate() {
	const [teamName, setTeamName] = useState("");
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);

	const router = useRouter();

	const addPokemon = async () => {
		if (pokemons.length >= MAX_TEAM_SIZE) {
			return alert(
				`You can't have more than ${MAX_TEAM_SIZE} Pokémon in your team!`,
			);
		}

		const response = await fetch("/api/pokemon/random");
		const data = await response.json();
		setPokemons([...pokemons, data]);
	};

	const saveTeam = async () => {
		if (teamName.length === 0) {
			return alert("Please provide a name for your team!");
		}

		if (pokemons.length === 0) {
			return alert("Please add at least a Pokémon to your team!");
		}

		await fetch("/api/team", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: teamName, pokemons }),
		});

		router.push("/team/list");
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Team Name"
				value={teamName}
				onChange={(e) => setTeamName(e.target.value)}
			/>
			<button type="button" onClick={addPokemon}>
				Gotta Catch 'Em All
			</button>
			<button type="button" onClick={saveTeam}>
				Save Team
			</button>
			<div>
				{pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</div>
	);
}
