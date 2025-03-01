import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

import { REDIS_CACHE_EXPIRATION } from "@/utils/constants";

const prisma = new PrismaClient();
const redis = new Redis();

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
			{ error: "Failed to fetch teams" },
			{ status: 500 },
		);
	}
}
