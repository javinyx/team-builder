import type { Pokemon } from "@/types";
import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

		return NextResponse.json(createdTeam, { status: 201 });
	} catch (error) {
		console.error("Error creating team:", error);
		return NextResponse.json(
			{ error: "Failed to create team", details: error },
			{ status: 500 },
		);
	}
}
