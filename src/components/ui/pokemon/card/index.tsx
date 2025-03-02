import type { Pokemon } from "@prisma/client";

import { PokemonSprite } from "../sprite";

type PokemonCardProps = {
	pokemon: Pokemon;
	children?: React.ReactNode;
};

export function PokemonCard(props: PokemonCardProps) {
	return (
		<div className="p-4 border border-neutral-900 rounded-3xl flex flex-col gap-4">
			<div>
				<PokemonSprite url={props.pokemon.sprite} name={props.pokemon.name} />
				<h1 className="text-2xl font-bold">{props.pokemon.name}</h1>
				<p className="text-xl">{props.pokemon.types.join(" / ")}</p>
				<p>Abilities: {props.pokemon.abilities.join(", ")}</p>
				<p>Base experience: {props.pokemon.baseExperience}</p>
			</div>
			{props.children}
		</div>
	);
}
