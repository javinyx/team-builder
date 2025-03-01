'use client';
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function TeamList() {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/team/list')
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);

  return (
    <div>
      <h1>Pokémon Teams</h1>
      {teams.map((team) => (
        <div key={team.id}>
          <h2>
            <Link href={`/team/${team.id}/edit`}>{team.name}</Link>
          </h2>
          <div>
            {team.pokemons.map((tp: any) => (
              <img key={tp.pokemon.id} src={tp.pokemon.sprite} alt={tp.pokemon.name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}