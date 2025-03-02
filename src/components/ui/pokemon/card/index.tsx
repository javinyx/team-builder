import type { Pokemon } from "@prisma/client";

import { PokemonSprite } from "../sprite";

type PokemonCardProps = {
	pokemon: Pokemon;
};

export function PokemonCard(props: PokemonCardProps) {
	return (
		<div>
			<PokemonSprite url={props.pokemon.sprite} name={props.pokemon.name} />
			<p>{props.pokemon.name}</p>
			<p>Types: {props.pokemon.types.join(", ")}</p>
			<p>Abilities: {props.pokemon.abilities.join(", ")}</p>
			<p>Base experience: {props.pokemon.baseExperience}</p>
		</div>
	);
}
