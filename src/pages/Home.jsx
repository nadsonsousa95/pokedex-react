import logo from './../assets/Vector.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Home.css';

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchPoke, setSearchPoke] = useState('');

  const api = `https://pokeapi.co/api/v2/pokemon?limit=151`;

  useEffect(() => {
    axios.get(api)
      .then((res) => {
        if (res.data && res.data.results) {
          setPokemons(res.data.results);
        } else {
          console.error('Resposta inesperada da API:', res.data);
        }
      })
      .catch((err) => console.error('Erro ao buscar pokémons:', err));
  }, []);

  const pokemonsFound = pokemons.filter((poke) =>
    `${poke.name}`.toLowerCase().includes(searchPoke.toLowerCase())
  );

  return (
    <div className='container'>
      <img className='logo' src={logo} alt="Logo Pokedex" />

      <input
        type='text'
        placeholder='Pesquisar Pokémon'
        value={searchPoke}
        onChange={(e) => setSearchPoke(e.target.value)}
      />

      <h1>Pokedex</h1>

      <div className='Cards'>
        {pokemonsFound.length === 0 ? (
          <p>Nenhum Pokémon encontrado.</p>
        ) : (
          pokemonsFound.map((pokemon, index) => (
            <Card key={index} url={pokemon.url} />
          ))
        )}
      </div>
    </div>
  );
}
