import Image from "next/image";

type PokemonSpriteProps = {
	url: string;
	name: string;
};

export function PokemonSprite(props: PokemonSpriteProps) {
	return (
		<Image
			width={96}
			height={96}
			className="sprite"
			quality={100}
			src={props.url}
			alt={props.name}
		/>
	);
}
