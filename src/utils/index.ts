export const pokemonsAvailable = 1025;

export async function getNumberOfAvailablePokemon() {
    const response = await fetch(`${process.env.POKEMON_API_URL}/pokemon/?limit=10000&offset=0`);

    const data = await response.json();

    return data.count;
}