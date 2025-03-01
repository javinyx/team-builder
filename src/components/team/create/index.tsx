"use client";

import type { Pokemon } from "@/types";
import { MAX_TEAM_SIZE } from "@/utils/constants";
import { useState } from "react";

export function TeamCreate() {
	const [teamName, setTeamName] = useState("");
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);

	const addPokemon = async () => {
		if (pokemons.length >= MAX_TEAM_SIZE) {
			return alert("You can't have more than 6 Pokémon in your team!");
		}

		const response = await fetch("/api/pokemon/random");
		const data = await response.json();
		setPokemons([...pokemons, data]);
	};

	const createTeam = async () => {
		await fetch("/api/team/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: teamName, pokemons }),
		});
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
						<img className="sprite" src={pokemon.sprite} alt={pokemon.name} />
						<p>{pokemon.name}</p>
						<p>Base experience: {pokemon.baseExp}</p>
						<p>Types: {pokemon.types.join(", ")}</p>
						<p>Abilities: {pokemon.abilities.join(", ")}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
