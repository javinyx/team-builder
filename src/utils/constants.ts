export const AVAILABLE_POKEMON = 1025;

export const MAX_TEAM_SIZE = Number.parseInt(process.env.NEXT_PUBLIC_MAX_TEAM_SIZE as string) || 6;

export const POKEMON_API_URL = (process.env.POKEMON_API_URL as string) || "https://pokeapi.co/api/v2";

export const REDIS_URL = (process.env.REDIS_URL as string) || "redis://localhost:6379";

export const REDIS_CACHE_EXPIRATION = Number.parseInt(process.env.REDIS_CACHE_EXPIRATION as string) || 1;