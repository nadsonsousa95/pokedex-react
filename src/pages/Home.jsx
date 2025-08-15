import logo from './../assets/Vector.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import './Home.css';

export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchPoke, setSearchPoke] = useState('');
  const [searchtype, setSearchtype] = useState('');
  const [loading, setLoading] = useState(true);

  const api = `https://pokeapi.co/api/v2/pokemon?limit=200`;

  useEffect(() => {
  async function fetchPokemons() {
    setLoading(true);
    try {
      const res = await axios.get(api);
      if (res.data && res.data.results) {
        const details = await Promise.all(
          res.data.results.map(async (poke) => {
            const detailRes = await axios.get(poke.url);
            return {
              ...poke,
              types: detailRes.data.types.map(t => t.type.name)
            };
          })
        );
        setPokemons(details);
      } else {
        console.error('Resposta inesperada da API:', res.data);
      }
    } catch (err) {
      console.error('Erro ao buscar pokémons:', err);
    }finally{
      setLoading(false);
    }
  }
  fetchPokemons();
}, []);


  const pokemonsFound = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(searchPoke.toLowerCase()) &&
    (searchtype === '' || (poke.types && poke.types.includes(searchtype)))
  );

  const types = [
    'fire', 'water', 'grass', 'electric', 'ground', 'poison', 'normal',
    'ice', 'fighting', 'ghost', 'dragon', 'bug', 'flying', 'rock', 'psychic', 'steel'
  ];

  if (loading) {
    return <p>Carregando Pokémons...</p>; 
  }

  return (
    <div className='container'>
      <img className='logo' src={logo} alt="Logo Pokedex" />

      <input
        type='text'
        placeholder='Pesquisar Pokémon'
        value={searchPoke}
        onChange={(e) => setSearchPoke(e.target.value)}
      />

      <div className='filter'>

        <div className='types'>
          {types.map((type) => (
            <button className='filter-type' key={type} onClick={() => setSearchtype(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
              <button className='button-reset' onClick={() => setSearchtype('')}>Limpar Filtros</button>
      </div>


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
