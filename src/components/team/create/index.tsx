"use client";

import { MAX_TEAM_SIZE } from "@/utils/constants";
import type { Pokemon } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

	const createTeam = async () => {
		if (teamName.length === 0) {
			return alert("Please provide a name for your team!");
		}

		if (pokemons.length === 0) {
			return alert("Please add at least a Pokémon to your team!");
		}

		await fetch("/api/team/create", {
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
			<button type="button" onClick={createTeam}>
				Save Team
			</button>
			<ul>
				{pokemons.map((pokemon) => (
					<li key={pokemon.id}>
						<Image
							width={96}
							height={96}
							className="sprite"
							src={pokemon.sprite}
							alt={pokemon.name}
						/>
						<p>{pokemon.name}</p>
						<p>Base experience: {pokemon.baseExperience}</p>
						<p>Types: {pokemon.types.join(", ")}</p>
						<p>Abilities: {pokemon.abilities.join(", ")}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
