import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/team/create">Create Team</Link></li>
            <li><Link href="/team/list">Team Listing</Link></li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}