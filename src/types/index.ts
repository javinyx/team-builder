export type Pokemon = {
    id: number;
    pokedexId: number;
    name: string;
    baseExp: number;
    localSprite: string;
    sprite: string;
    types: string[];
    abilities: string[];
}

export type Team = {
    id: string;
    name: string;
    pokemons: TeamPokemonEntity[];
} | null;

export type TeamPokemonEntity = {
    teamId: string;
    pokemonId: string;
    pokemon: Pokemon;
}