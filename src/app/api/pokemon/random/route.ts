import fs from "node:fs";
import path from "node:path";
import type { PokeAPI } from "pokeapi-types";

import type { Pokemon } from "@/types";
import { capitalize, removeDashes } from "@/utils";
import { AVAILABLE_POKEMON } from "@/utils/constants";


export async function GET() {
	const randomId = Math.floor(Math.random() * AVAILABLE_POKEMON) + 1;
	try {
		const response = await fetch(
			`${process.env.POKEMON_API_URL}/pokemon/${randomId}`,
		);
		const data = await response.json() as PokeAPI.Pokemon;

		const pokemonName = data.name;
		const pokedexId = data.id;
		const spriteUrl = data.sprites.front_default;
		const spritesDirectory = path.join(process.cwd(), 'public', 'sprites');
		const spritePath = path.join(spritesDirectory, `${pokedexId}.png`);

		if (!fs.existsSync(spritesDirectory)) {
			fs.mkdirSync(spritesDirectory);
		}

		if (!fs.existsSync(spritePath)) {
			const imageResponse = await fetch(spriteUrl);
			const buffer = await imageResponse.arrayBuffer();
			fs.writeFileSync(spritePath, Buffer.from(buffer));
		}

		const pokemon: Pokemon = {
			id: pokedexId,
			pokedexId: pokedexId,
			name: capitalize(pokemonName),
			baseExp: data.base_experience,
			localSprite: `/sprites/${pokedexId}.png`,
			sprite: spriteUrl,
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
