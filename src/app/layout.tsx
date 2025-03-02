import type { Metadata } from "next";
import Link from "next/link";

import "../styles/globals.css";

export const metadata: Metadata = {
	title: "Team Builder",
	description: "Pokémon team builder",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" />
			</head>
			<body>
				<nav>
					<ul>
						<li>
							<Link href="/">Home</Link>
						</li>
						<li>
							<Link href="/team/create">Create Team</Link>
						</li>
						<li>
							<Link href="/team/list">Team Listing</Link>
						</li>
					</ul>
				</nav>
				{children}
			</body>
		</html>
	);
}
