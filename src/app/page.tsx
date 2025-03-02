import Image from "next/image";

export default function HomePage() {
	return (
		<div className="flex flex-col items-center gap-8 mt-12">
			<h1 className="text-4xl">Welcome to Pokémon Team Builder!</h1>
			<Image
				className="rendering-pixelated"
				src="/hitmonchan.png"
				width={300}
				height={300}
				alt="Hitmonchan"
				unoptimized
			/>
			<h2 className="text-xl">
				Please use the navigation above to access all the features.
			</h2>
		</div>
	);
}
