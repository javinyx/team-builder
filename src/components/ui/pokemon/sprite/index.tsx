import Image from "next/image";

type PokemonSpriteProps = {
	url: string;
	name: string;
};

export function PokemonSprite(props: PokemonSpriteProps) {
	return (
		<Image
			width={120}
			height={120}
			className="rendering-pixelated inline-block"
			quality={100}
			src={props.url}
			alt={props.name}
		/>
	);
}
