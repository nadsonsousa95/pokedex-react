import logo from '../../assets/Vector.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card.jsx';
import './Home.css';
import { FaSearch } from "react-icons/fa";



export function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchPoke, setSearchPoke] = useState('');
  const [searchtype, setSearchtype] = useState('');
  const [loading, setLoading] = useState(true);

  const api = `https://pokeapi.co/api/v2/pokemon?limit=151`;

  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);
      try {
        const res = await axios.get(api);
        if (res.data && res.data.results) {
          setPokemons(res.data.results); // salva só nome e url
          // Busca os tipos em lotes
          const batchSize = 10;
          for (let i = 0; i < res.data.results.length; i += batchSize) {
            const batch = res.data.results.slice(i, i + batchSize);
            const details = await Promise.all(
              batch.map(async (poke) => {
                const detailRes = await axios.get(poke.url);
                return {
                  ...poke,
                  types: detailRes.data.types.map(t => t.type.name)
                };
              })
            );
            setPokemons(prev =>
              prev.map(p =>
                details.find(d => d.name === p.name) ? details.find(d => d.name === p.name) : p
              )
            );
          }
        } else {
          console.error('Resposta inesperada da API:', res.data);
        }
      } catch (err) {
        console.error('Erro ao buscar pokémons:', err);
      } finally {
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

  if (loading) return (<div>
            <img className='logo' src={logo} alt="Logo Pokedex" />
              <p>Carregando Pokémons...</p>
            </div>)
  

  return (
    <div className='container'>
      <img className='logo' src={logo} alt="Logo Pokedex" />

      <div className='search'>
        <FaSearch className='search-icon' size={20} />
        <input
          type='text'
          placeholder='Pesquisar Pokémon'
          value={searchPoke}
          onChange={(e) => setSearchPoke(e.target.value)}
          className='search-input'
        />
      </div>

      <div className='filter'>

        <div className='types'>
          {types.map((type) => (
            <button className='filter-type' key={type} onClick={() => setSearchtype(type)}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <button className='button-reset' onClick={() => setSearchtype('')}><FaSearch size={15} />Limpar Filtros</button>
      </div>

      <div>
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

    </div>
  );
}
