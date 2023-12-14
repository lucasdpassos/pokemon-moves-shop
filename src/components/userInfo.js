import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, selectPokemon } from '../features/userSlice';
import PowerCard from '../components/powerCard';
import PowerCardSkeleton from '../components/powerCardSkeleton';
import CartComponent from './CartComponent';
import SearchIcon from '@mui/icons-material/Search';
import { setNewItemAdded } from '../features/cartSlice';
import SnackbarComponent from './powerAddedSnackbar';

const UserInfo = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(selectPokemon);
  const [inputPokemon, setInputPokemon] = useState('');
  const newItemAdded = useSelector((state) => state.cart.newItemAdded);


  const handleSearch = () => {
    dispatch(fetchPokemon(inputPokemon));
  };

  const handleSnackbarClose = () => {
    dispatch(setNewItemAdded(false)); // Reset the flag when Snackbar is closed
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
      <h2 className='mx-auto mb-5 font-bold'>Digite o nome do Pokémon</h2>
      <div className='flex flex-row align-middle justify-center'>
      <label>
        Pokémon:
        <input
          type="text"
          value={inputPokemon}
          onChange={(e) => setInputPokemon(e.target.value)}
          className='border-black border ml-1 mr-1'
        />
      </label>
      <button className='bg-slate-500 text-white w-16 h-7 shadow-lg rounded-md hover:bg-slate-900' onClick={handleSearch}><SearchIcon /></button>
      </div>
      <CartComponent />
      
      
      </div>
      <div>
        
        <h3>Informações do Pokémon:</h3>
        {pokemon.pokemonLoading && <PowerCardSkeleton />}
        {pokemon.name && !pokemon.pokemonLoading ? (
          <div>
            <div className='flex flex-col align-middle mx-auto justify-center items-center'>
            <img className='animate-bounce max-w-[60px] max-h-14' src={pokemon.avatar} alt='poke' />
            <p>Name: {pokemon.name}</p>
            <p>ID: {pokemon.id}</p>
            <p>Location Area Encounters: {pokemon.locationAreaEncounters}</p>
            <h3>Moves:</h3>
            </div>
            {renderMoveGroups()}
            <SnackbarComponent
        open={newItemAdded}
        onClose={handleSnackbarClose}
        message="Item adicionado com sucesso"
      />
          </div>
        ) : (
          <p>Nenhum Pokémon encontrado.</p>
        )}
      </div>
    
    </div>
  );
};

export default UserInfo;
