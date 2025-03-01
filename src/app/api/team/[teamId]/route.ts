import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import type { PokemonData } from "../../pokemon/random/route";

const prisma = new PrismaClient();

export async function GET(
	req: NextRequest,
	{ params }: { params: { teamId: string } },
) {
	try {
		const team = await prisma.team.findUnique({
			where: { id: params.teamId },
			include: { pokemons: { include: { pokemon: true } } },
		});
		return NextResponse.json(team);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch team" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { teamId: string } },
) {
	try {
		const { name, pokemons } = await req.json();

		const updatedTeam = await prisma.team.update({
			where: { id: params.teamId },
			data: {
				name,
				pokemons: {
					deleteMany: {},
					create: pokemons.map((pokemon: PokemonData) => ({
						pokemon: {
							connectOrCreate: {
								where: { name: pokemon.name },
								create: {
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

		return NextResponse.json(updatedTeam);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to update team" },
			{ status: 500 },
		);
	}
}
