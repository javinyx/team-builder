"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function TeamList() {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		fetch("/api/team/list")
			.then((res) => res.json())
			.then((data) => setTeams(data));
	}, []);

	return (
		<div>
			{teams.map((team) => (
				<div key={team.id}>
					<div>
						<h2>{team.name}</h2>
						<Link href={`/team/${team.id}/edit`}>
							<button type="button">Edit</button>
						</Link>
					</div>
					<div>
						{team.pokemons.map((tp: any) => (
							<img
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
