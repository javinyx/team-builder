import type { Metadata } from "next";
import Link from "next/link";

import "../styles/index.css";

export const metadata: Metadata = {
	title: "Team Builder",
	description: "Pokémon team builder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className="overflow-x-hidden max-w-lvw">
			<head>
				<link rel="icon" href="/favicon.png" />
			</head>
			<body className="overflow-x-hidden max-w-lvw bg-neutral-950 text-neutral-200 text-center text-lg">
				<header>
					<nav className="flex flex-row w-screen justify-center gap-12 p-6 text-xl bg-red-900">
						<Link href="/">Home</Link>
						<Link href="/team/create">Create Team</Link>
						<Link href="/team/list">Team Listing</Link>
					</nav>
				</header>
				<main className="p-6">{children}</main>
			</body>
		</html>
	);
}
