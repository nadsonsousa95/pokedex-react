import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CardDetailPage.css';
import logo from '../../assets/Vector.svg';
import { FaWeight } from "react-icons/fa";
import { FaW } from 'react-icons/fa6';
import { GiBodyHeight } from "react-icons/gi";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";



export default function CardDetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState('');

  const api = `https://pokeapi.co/api/v2/pokemon/${id}`;

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        const res = await axios.get(api);
        setPokemon(res.data);
        setImage(res.data.sprites.front_default);
      } catch (err) {
        console.error('Erro ao buscar detalhes do Pokémon:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemon();
  }, [id]);

  function handleClick(){
    if (image === pokemon.sprites.front_default) {
      setImage(pokemon.sprites.back_default);
    }else if (image === pokemon.sprites.back_default) {
      setImage(pokemon.sprites.front_default);
    }
  } 

  if (loading) return (
    <div>
        <img className='logo' src={logo} alt="Logo Pokedex" />
        <p>Carregando detalhes do Pokémon...</p>
    </div>)

  if (!pokemon) return <p>Pokémon não encontrado.</p>;


  return (
    <div className='card-detail'>
    <div className={`card-detail-main  type ${pokemon.types[0].type.name}`}>
      <div className='back-button' onClick={() => window.history.back()}>
           <IoIosReturnLeft size={25} />
           <span className='back' >Voltar</span>
        </div>
        <header onClick={handleClick} className={`card-detail-header`}>
            <span className="card-detail-id">N° {'0' + pokemon.id} </span>
            <img className='img' src={image}></img>
        </header>
    </div>

    <div className='card-detail-info'>
      <h1 className='poke-name'>{pokemon.name}</h1>
            <div className="types">
            {pokemon.types.map((tipo, index) => (
                <span key={index} className={`type ${tipo.type.name}`}>
                    {tipo.type.name}
                </span>
            ))}
            </div>

         <div className='about'>
            <div className='about-content'>
               <div className='height-weight'>
                <GiBodyHeight size={25} className={`style ${pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : ''}`}/>
                  <p> {pokemon.height/10} m <br></br><strong>Altura</strong></p>
                </div>
                <div className='height-weight'>
                  <FaLevelUpAlt size={25} className={`style ${pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : ''}`} />
                  <p>{pokemon.base_experience} <br></br><strong>Experiência</strong></p>
                </div>
                <div className='height-weight'>
                  <FaWeight size={25} className={`style ${pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : ''}`} />
                  <p> {pokemon.weight/10} kg <br></br><strong>Peso</strong></p>
                </div>
            </div>
      </div>
      <div className='abilities'>
        <h2 className={`style ${pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : ''}`}>Habilidades</h2>
           <p>{pokemon.abilities.map((ability, index) => (
                    <span key={index}>{ability.ability.name}{index < pokemon.abilities.length - 1 ? ', ' : ''}</span>
                ))}</p>
        </div>
         
        <div className='stats'>
            <h2 className={`style ${pokemon.types && pokemon.types[0] ? pokemon.types[0].type.name : ''}`}>Estatísticas</h2>
            <ul>
                {pokemon.stats.map((stat, index) => (
                    <p key={index}>
                        <span className='stat-name'><strong>{stat.stat.name == 'attack' ? 'Ataque' :
                        stat.stat.name == 'defense' ? 'Defesa' :
                        stat.stat.name == 'special-attack' ? 'Ataque Especial' :
                        stat.stat.name == 'special-defense' ? 'Defesa Especial' :
                        stat.stat.name == 'speed' ? 'Velocidade' :
                        stat.stat.name == 'hp' ? 'HP' : stat.stat.name }: </strong></span>
                        <span className='stat-value'>{stat.base_stat}</span>
                    </p>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
}