import React, { useEffect, useState} from 'react'
import axios from 'axios'
import './PokemonList.css'
import Pokemon from '../Pokemon/pokemon';


const PokemonList = () => {

  const [pokemonList, setPokemonList]= useState([]);
  const[isLoading,setIsLoading]= useState(true);

  const [pokedexUrl,setpokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

    async function downloadPokemon() {
      setIsLoading(true)
     const response = await axios.get(pokedexUrl); // this download list of 20 polkemons

      //console.log(response.data);
      // In above data is used for show api data in browser that why i used data keyword there
      //showing up 20 data in the browser you can check  as well...
     
      const pokemonResult = response.data.results;   // we get the array of pokemons from result
     
      console.log(response.data);

      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous
        );


      //iterating over the array of pokemons, and using their url, to create an array of promises
      // that will download those 20 pokemons
     const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));
     
     // passing that promise array to axios.all

     const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
     console.log(pokemonData);
    
     // now iterate on the data of each pokemon, and extract id, name, image, types,
     const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default:pokemon.sprites
        .front_shiny,
        types: pokemon.types
      
      }

     });

   
     console.log(pokeListResult);
     setPokemonList(pokeListResult);
     setIsLoading(false);
     
     
    }
 
     useEffect(()=>{
      downloadPokemon();      
    },[pokedexUrl]);


  return (
    
    <div className="pokemon-list-wrapper">
      

      <div className="pokemon-wrapper">

      {(isLoading) ? 'Loading....' : pokemonList.map((p) =>
       <Pokemon name ={p.name} image = {p.image} key={p.id} id = {p.id} />
       
       )}

      </div>
      
      <div className="controls">
        
        <button disabled = {prevUrl==null} onClick={()=> setpokedexUrl(prevUrl)} >Prev</button>
        <button disabled={nextUrl == null} onClick={()=>setpokedexUrl(nextUrl)}>Next</button>
        
        </div>

    

    </div>   
  )
}
export default PokemonList;