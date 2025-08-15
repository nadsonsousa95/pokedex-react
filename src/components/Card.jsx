import { useEffect, useState } from "react"
import axios from 'axios'
import './Card.css'

export default function Card({url}){
    const [poke, setPoke] = useState(null)

    useEffect(()=>{
        axios.get(url)
            .then((res)=> setPoke(res.data))
    }, [url])

    if(!poke){
        return(<p>Pokemon não encontrado!</p>)
    }


    const isFire = poke.types.some(t => t.type.name === 'fire')
    const iswater = poke.types.some(t => t.type.name === 'water')
    const isGrass = poke.types.some(t => t.type.name === 'grass')

    return(
        <div className={isFire ? 'CardFire Card'  
         : iswater ? 'CardWater Card' 
         : isGrass ? 'CardGrass Card' 
         : 'Card'}>
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
    )
}