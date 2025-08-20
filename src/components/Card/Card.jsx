import { useEffect, useState } from "react"
import axios from 'axios'
import './Card.css'
import {Link, useNavigate} from 'react-router-dom'

export default function Card({url}){
    const [poke, setPoke] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(url)
            .then((res)=> setPoke(res.data))
    }, [url])

    if(!poke){
        return(<p>Pokemon não encontrado!</p>)
    }

    const handleClick = () => {
        navigate(`/pokemon/${poke.id}`)
    }


    const isFire = poke.types.some(t => t.type.name === 'fire')
    const iswater = poke.types.some(t => t.type.name === 'water')
    const isGrass = poke.types.some(t => t.type.name === 'grass')
    const isElectric = poke.types.some(t => t.type.name === 'electric')
    const isGround = poke.types.some(t => t.type.name === 'ground')
    const isPoison = poke.types.some(t => t.type.name === 'poison')
    const isNormal = poke.types.some(t => t.type.name === 'normal')
    const isIce = poke.types.some(t => t.type.name === 'ice')
    const isFighting = poke.types.some(t => t.type.name === 'fighting')
    const isGhost = poke.types.some(t => t.type.name === 'ghost')
    const isDragon = poke.types.some(t => t.type.name === 'dragon')
    const isBug = poke.types.some(t => t.type.name === 'bug')
    const isFlying = poke.types.some(t => t.type.name === 'flying')
    const isRock = poke.types.some(t => t.type.name === 'rock')
    const isPsychic = poke.types.some(t => t.type.name === 'psychic')
    const isSteel = poke.types.some(t => t.type.name === 'steel')
    const isFairy = poke.types.some(t => t.type.name === 'fairy')

    return(
        <div onClick={handleClick} className={isFire ? 'CardFire Card'  
         : iswater ? 'CardWater Card' 
         : isGrass ? 'CardGrass Card' 
         : isElectric ? 'CardElectric Card'
         : isGround ? 'CardGround Card'
            : isPoison ? 'CardPoison Card'
            : isNormal ? 'CardNormal Card'
            : isIce ? 'CardIce Card'
            : isFighting ? 'CardFighting Card'
            : isGhost ? 'CardGhost Card'
            : isDragon ? 'CardDragon Card'
            : isBug ? 'CardBug Card'
            : isFlying ? 'CardFlying Card'
            : isRock ? 'CardRock Card'
            : isPsychic ? 'CardPsychic Card'
            : isSteel ? 'CardSteel Card'
            : isFairy ? 'CardFairy Card'
            : 'Card'}>
            <div className="info-container">
                    <div>
                <span className="id">N° {poke.id}</span>
                <h2>{poke.name}</h2>
                <div className="types">
                    {poke.types.map((tipo, index) => (
                        <span key={index} className={`type ${tipo.type.name}`}>
                                {tipo.type.name}
                        </span>
                    ))}
                    </div>
                   
            </div>
            <img src={poke.sprites.front_default}></img>
            </div>
        </div>
    )
}