import { PrismaClient } from "@prisma/client";

import type { Pokemon } from "@/types";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { name, pokemons } = await req.json();

		const createdTeam = await prisma.team.create({
			data: {
				name: name.trim(),
				pokemons: {
					create: pokemons.map((pokemon: Pokemon) => ({
						pokemon: {
							connectOrCreate: {
								where: { pokedexId: pokemon.pokedexId },
								create: {
									id: crypto.randomUUID(),
									pokedexId: pokemon.pokedexId,
									name: pokemon.name,
									localSprite: pokemon.localSprite,
									sprite: pokemon.sprite,
									baseExp: pokemon.baseExp,
									abilities: pokemon.abilities,
									types: pokemon.types,
								},
							},
						},
					})),
				},
			},
			include: { pokemons: { include: { pokemon: true } } },
		});

		return Response.json(createdTeam, { status: 201 });
	} catch (error) {
		console.log(error);
		return Response.json(
			{ error: "Failed to create team", details: error },
			{ status: 500 },
		);
	}
}
