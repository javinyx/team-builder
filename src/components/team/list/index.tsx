"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { PokemonSprite } from "@/components/ui/pokemon/sprite";
import type { TeamPokemonWithPokemon, TeamWithPokemon } from "@/types";

export function TeamList() {
	const [teams, setTeams] = useState<TeamWithPokemon[]>([]);

	useEffect(() => {
		fetch("/api/team")
			.then((res) => res.json())
			.then((data) => setTeams(data));
	}, []);

	return (
		<div className="flex flex-col gap-6">
			{teams.map((team: TeamWithPokemon) => (
				<div key={team.id} className="border border-neutral-900 rounded-3xl">
					<div className="flex flex-row p-4 justify-between">
						<h1 className="text-2xl">{team.name}</h1>
						<Link href={`/team/${team.id}/edit`}>
							<Button>Edit</Button>
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
