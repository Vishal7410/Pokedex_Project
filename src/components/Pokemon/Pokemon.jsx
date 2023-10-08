import React from 'react'

 import './pokemon.css'
import { Link } from 'react-router-dom'

const Pokemon = ({name, image,id}) => {
  return (

    

    <div className='pokemon'>

      <Link to = {`/pokemon/${id}`}>

      <div className='pokemon_name'>{name}</div>
        <div>
          <img className="pokemon-img" src = {image} />
          </div>

      </Link>
        
    </div>

  )
}

export default Pokemon

