import { PrismaClient } from "@prisma/client";

import type { Pokemon } from "@/types";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	try {
		const { name, pokemons } = await req.json();

		const createdTeam = await prisma.team.create({
			data: {
				name,
				pokemons: {
					create: pokemons.map((pokemon: Pokemon) => ({
						pokemon: {
							connectOrCreate: {
								where: { name: pokemon.name },
								create: {
									id: crypto.randomUUID(),
									name: pokemon.name,
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
		return Response.json(
			{ error: "Failed to create team", details: error },
			{ status: 500 },
		);
	}
}
