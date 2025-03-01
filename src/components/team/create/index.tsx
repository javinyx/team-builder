"use client";

import type { Pokemon } from "@/types";
import { MAX_TEAM_SIZE } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TeamCreate() {
	const [teamName, setTeamName] = useState("");
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [disabledAddButton, setDisabledAddButton] = useState(false);
	const [disabledSaveButton, setDisabledSaveButton] = useState(false);

	const router = useRouter();

	const addPokemon = async () => {
		if (pokemons.length >= MAX_TEAM_SIZE) {
			return alert(
				`You can't have more than ${MAX_TEAM_SIZE} Pokémon in your team!`,
			);
		}

		setDisabledAddButton(true);
		setDisabledSaveButton(true);

		const response = await fetch("/api/pokemon/random");
		const data = await response.json();
		setPokemons([...pokemons, data]);

		setDisabledAddButton(false);
		setDisabledSaveButton(false);
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
			<button type="button" onClick={addPokemon} disabled={disabledAddButton}>
				Gotta Catch 'Em All
			</button>
			<button type="button" onClick={createTeam} disabled={disabledSaveButton}>
				Save Team
			</button>
			<ul>
				{pokemons.map((pokemon) => (
					<li key={pokemon.id}>
						<img
							className="sprite"
							src={pokemon.localSprite}
							alt={pokemon.name}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = pokemon.sprite;
							}}
						/>
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
