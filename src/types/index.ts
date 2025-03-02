import type { Prisma } from "@prisma/client";

export type TeamWithPokemon = Prisma.TeamGetPayload<{ include: { pokemons: { include: { pokemon: true } } } }>;

export type TeamPokemonWithPokemon = Prisma.TeamPokemonGetPayload<{ include: { pokemon: true } }>;