"use client";

import type { TeamPokemonWithPokemon, TeamWithPokemon } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function TeamList() {
	const [teams, setTeams] = useState<any>([]);

	useEffect(() => {
		fetch("/api/team/list")
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
							<Image
								width={96}
								height={96}
								className="sprite"
								key={tp.pokemon.id}
								src={tp.pokemon.sprite}
								alt={tp.pokemon.name}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}
