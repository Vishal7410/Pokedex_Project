import React from 'react'

/**
 * import './pokemon.css'

const Pokemon = ({name,image}) => {
  return (
    <div>
        <div>{name}</div>
        <div><img src = {image} /></div>
        <div>{type}</div>
    </div>

  )
}

export default Pokemon
 * 
 */

function Pokemon({name, image}){
  return(
    <div>
      <div>{name}</div>
      <div><img src = {image}/></div>
      
    </div>
  )
}
export default Pokemon
