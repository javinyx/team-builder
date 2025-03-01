import type { PokeAPI } from "pokeapi-types";

import type { Pokemon } from "@/types";
import { AVAILABLE_POKEMON } from "@/utils/constants";

export async function GET() {
	const randomId = Math.floor(Math.random() * AVAILABLE_POKEMON) + 1;
	try {
		const response = await fetch(
			`${process.env.POKEMON_API_URL}/pokemon/${randomId}`,
		);
		const data = await response.json() as PokeAPI.Pokemon;

		const pokemon: Pokemon = {
			id: data.id,
			name: `${data.name[0].toUpperCase()}${data.name.slice(1)}`,
			baseExp: data.base_experience,
			sprite: data.sprites.front_default,
			types: data.types.map((type) => type.type.name),
			abilities: data.abilities.map((ability) => ability.ability.name),
		};

		return Response.json(pokemon);
	} catch {
		return Response.json(
			{ error: `Failed to fetch Pokémon with id ${randomId}` },
			{ status: 500 },
		);
	}
}
