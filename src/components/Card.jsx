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
    return(
        <div className={isFire ? 'CardFire Card'  : 'Card'}>
            <div>
                <h2>{poke.name}</h2>
                <div className="types">
                    {poke.types.map((tipo, index) =>
                        <span key={index}>{tipo.type.name} </span>
                    )}
                </div>
                <br></br>
            </div>
            <img src={poke.sprites.front_default}></img>
        </div>
    )
}