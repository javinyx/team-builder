'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditTeam({ params }: { params: { teamId: string } }) {
  const [team, setTeam] = useState<any>(null);
  const [teamName, setTeamName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/team/${params.teamId}`)
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setTeamName(data.name);
      });
  }, [params.teamId]);

  const saveChanges = async () => {
    await fetch(`/api/team/${params.teamId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: teamName, pokemons: team.pokemons.map((tp: any) => tp.pokemon) }),
    });
    router.push('/team/list');
  };

  return (
    <div>
      <h1>Edit Team</h1>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button onClick={saveChanges}>Save</button>
      <div>
        {team?.pokemons.map((tp: any) => (
          <div key={tp.pokemon.id}>
            <img src={tp.pokemon.sprite} alt={tp.pokemon.name} />
            <p>{tp.pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
