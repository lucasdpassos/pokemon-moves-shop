import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, selectPokemon } from '../features/userSlice';
import PowerCard from '../components/powerCard';
import PowerCardSkeleton from '../components/powerCardSkeleton';
import CartComponent from './CartComponent';

const UserInfo = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const [inputPokemon, setInputPokemon] = useState('');

  const handleSearch = () => {
    dispatch(fetchPokemon(inputPokemon));
  };

  const renderMoveGroups = () => {
    const { moves } = pokemon;
    const movesGroups = [];

    for (let i = 0; i < moves.length; i += 4) {
      const movesGroup = moves.slice(i, i + 4);
      const groupCards = movesGroup.map((move, index) => (
        <PowerCard key={index} moves={move} />
      ));

      movesGroups.push(
        <div key={i / 4} style={{ display: 'flex', justifyContent: 'center' }}>
          {groupCards}
        </div>
      );
    }

    return movesGroups;
  };

  return (
    <div >
      <div className='flex flex-col'>
      <h2>Buscar Pokémon por Nome</h2>
      <label>
        Pokémon:
        <input
          type="text"
          value={inputPokemon}
          onChange={(e) => setInputPokemon(e.target.value)}
        />
      </label>
      <button className='bg-slate-500 text-white w-16 h-7 shadow-lg rounded-md hover:bg-slate-900' onClick={handleSearch}>Buscar</button>
      <CartComponent />
      
      
      </div>
      <div>
        <h3>Informações do Pokémon:</h3>
        {pokemon.pokemonLoading && <PowerCardSkeleton />}
        {pokemon.name && !pokemon.pokemonLoading ? (
          <div>
            <img className='animate-bounce' src={pokemon.avatar} alt='poke' />
            <p>Name: {pokemon.name}</p>
            <p>ID: {pokemon.id}</p>
            <p>Location Area Encounters: {pokemon.locationAreaEncounters}</p>
            <h3>Moves:</h3>
            {renderMoveGroups()}
          </div>
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </div>
    
    </div>
  );
};

export default UserInfo;
