import { type Pokemon, PrismaClient } from "@prisma/client";
import Redis from "ioredis";

import { REDIS_CACHE_EXPIRATION, REDIS_URL } from "@/utils/constants";

const prisma = new PrismaClient();
const redis = new Redis(REDIS_URL);

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

export async function GET() {
    try {
        const cacheKey = "teams:list";
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            return Response.json(JSON.parse(cachedData));
        }

        const teams = await prisma.team.findMany({
            include: { pokemons: { include: { pokemon: true } } },
            orderBy: { createdAt: "desc" },
        });

        await redis.set(cacheKey, JSON.stringify(teams), "EX", REDIS_CACHE_EXPIRATION);

        return Response.json(teams);
    } catch (error) {
        return Response.json(
            { error: "Failed to fetch teams", details: error },
            { status: 500 },
        );
    }
}
