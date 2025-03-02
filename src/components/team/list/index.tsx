"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PokemonSprite } from "@/components/ui/pokemon/sprite";
import type { TeamPokemonWithPokemon, TeamWithPokemon } from "@/types";

export function TeamList() {
	const [teams, setTeams] = useState<any>([]);

	useEffect(() => {
		fetch("/api/team")
			.then((res) => res.json())
			.then((data) => setTeams(data));
	}, []);

	return (
		<div>
			{teams.map((team: TeamWithPokemon) => (
				<div key={team.id}>
					<div>
						<h2>{team.name}</h2>
						<Link href={`/team/${team.id}/edit`}>
							<button type="button">Edit</button>
						</Link>
					</div>
					<div>
						{team.pokemons.map((tp: TeamPokemonWithPokemon) => (
							<PokemonSprite
								key={tp.pokemon.id}
								name={tp.pokemon.name}
								url={tp.pokemon.sprite}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
