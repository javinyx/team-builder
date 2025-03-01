import { pokemonsAvailable } from "@/utils/constants";

export interface PokemonData {
	id: number;
	name: string;
	baseExp: number;
	sprite: string;
	types: string[];
	abilities: string[];
}

export async function GET() {
	const randomId = Math.floor(Math.random() * pokemonsAvailable) + 1;
	try {
		const response = await fetch(
			`${process.env.POKEMON_API_URL}/pokemon/${randomId}`,
		);
		const data = await response.json();

		const pokemon: PokemonData = {
			id: data.id,
			name: `${data.name[0].toUpperCase()}${data.name.slice(1)}`,
			baseExp: data.base_experience,
			sprite: data.sprites.front_default,
			types: data.types.map((type: any) => type.type.name),
			abilities: data.abilities.map((ability: any) => ability.ability.name),
		};

		return Response.json(pokemon);
	} catch {
		return Response.json(
			{ error: `Failed to fetch Pokémon with id ${randomId}` },
			{ status: 500 },
		);
	}
}
