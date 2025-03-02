import { type Pokemon, PrismaClient } from "@prisma/client";

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
								where: { pokedexNumber: pokemon.pokedexNumber },
								create: {
									id: crypto.randomUUID(),
									name: pokemon.name,
									pokedexNumber: pokemon.pokedexNumber,
									sprite: pokemon.sprite,
									baseExperience: pokemon.baseExperience,
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
