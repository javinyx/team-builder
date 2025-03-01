import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const redis = new Redis();

export async function GET() {
    try {
        const cacheKey = 'teams:list';
        const cachedData = await redis.get(cacheKey);
        if (cachedData) {
            return NextResponse.json(JSON.parse(cachedData));
        }

        const teams = await prisma.team.findMany({
            include: { pokemons: { include: { pokemon: true } } },
            orderBy: { createdAt: 'desc' },
        });

        await redis.set(cacheKey, JSON.stringify(teams), 'EX', 1);

        return NextResponse.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
    }
}