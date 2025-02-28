'use client';

import { PokemonData } from '@/app/api/pokemon/random/route';
import { useState } from 'react';

export default function CreateTeam() {
  const [teamName, setTeamName] = useState('');
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);

  const addPokemon = async () => {
    const response = await fetch('/api/pokemon/random');
    const data = await response.json();
    setPokemons([...pokemons, data]);
  };

  const createTeam = async () => {
    await fetch('/api/team/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: teamName, pokemons })
    });
  };

  return (
    <div>
      <h1>Create a New Pokémon Team</h1>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button onClick={addPokemon}>Gotta Catch 'Em All</button>
      <button onClick={createTeam}>Save Team</button>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <img src={pokemon.sprite} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <p>Base experience: {pokemon.baseExp}</p>
            <p>{pokemon.types.join(', ')}</p>
            <p>{pokemon.abilities.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}