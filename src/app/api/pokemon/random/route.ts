import { pokemonsAvailable } from "@/utils";

interface PokemonType {
    type: {
        name: string;
    }
}

interface PokemonAbility {
    ability: {
        name: string;
    }
}

interface PokemonData {
    id: number;
    name: string;
    baseExp: number;
    sprite: string;
    types: PokemonType[];
    abilities: PokemonAbility[];
}


export async function GET() {
    const randomId = Math.floor(Math.random() * pokemonsAvailable) + 1;
    try {
        const response = await fetch(`${process.env.POKEMON_API_URL}/pokemon/${randomId}`);
        const data = await response.json();

        const pokemon: PokemonData = {
            id: data.id,
            name: `${data.name[0].toUpperCase()}${data.name.slice(1)}`,
            baseExp: data["base_experience"],
            sprite: data.sprites["front_default"],
            types: [...data.types],
            abilities: [...data.abilities]
        }

        return Response.json(pokemon);
    } catch {
        return Response.json(`sonny ${randomId}`);
    }
}