import { PrismaClient } from "@prisma/client";

import type { TeamEditProps } from "@/app/team/[team-id]/edit/page";
import type { Pokemon } from "@/types";

const prisma = new PrismaClient();

export async function GET(
	_req: Request,
	{ params }: TeamEditProps
) {
	const teamId = (await params)["team-id"];

	try {
		const team = await prisma.team.findUnique({
			where: { id: teamId },
			include: { pokemons: { include: { pokemon: true } } },
		});
		return Response.json(team);
	} catch (error) {
		return Response.json(
			{ error: "Failed to fetch team" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: TeamEditProps,
) {
	const teamId = (await params)["team-id"];

	try {
		const { name, pokemons } = await req.json();

		const updatedTeam = await prisma.team.update({
			where: { id: teamId },
			data: {
				name: name.trim(),
				pokemons: {
					deleteMany: {},
					create: pokemons.map((pokemon: Pokemon) => ({
						pokemon: {
							connectOrCreate: {
								where: { pokedexNumber: pokemon.pokedexNumber },
								create: {
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

		return Response.json(updatedTeam);
	} catch (error) {
		return Response.json(
			{ error: "Failed to update team" },
			{ status: 500 },
		);
	}
}
