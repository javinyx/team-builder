export const AVAILABLE_POKEMON = 1025;

export const MAX_TEAM_SIZE = Number.parseInt(process.env.MAX_TEAM_SIZE as string) || 6;

export const REDIS_CACHE_EXPIRATION = Number.parseInt(process.env.REDIS_CACHE_EXPIRATION as string) || 1;