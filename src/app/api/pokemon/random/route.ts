import type { PokeAPI } from "pokeapi-types";

import { capitalize, removeDashes } from "@/utils";
import { AVAILABLE_POKEMON, POKEMON_API_URL } from "@/utils/constants";
import type { Pokemon } from "@prisma/client";

export async function GET() {
	const randomId = Math.floor(Math.random() * AVAILABLE_POKEMON) + 1;
	try {
		const response = await fetch(
			`${POKEMON_API_URL}/pokemon/${randomId}`,
		);
		const data = await response.json() as PokeAPI.Pokemon;

		const pokemon: Pokemon = {
			id: crypto.randomUUID(),
			name: capitalize(data.name),
			pokedexNumber: data.id,
			baseExperience: data.base_experience,
			sprite: data.sprites.front_default,
			types: data.types.map((type) => capitalize(type.type.name)),
			abilities: data.abilities.map((ability) => removeDashes(capitalize(ability.ability.name))),
		};

		return Response.json(pokemon);
	} catch (error) {
		return Response.json(
			{ error: `Failed to fetch Pokémon with id ${randomId}` },
			{ status: 500 },
		);
	}
}
