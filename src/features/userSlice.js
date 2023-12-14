// src/features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPokemon = createAsyncThunk(
  "user/fetchPokemon",
  async (pokemonName) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      const { name, id, location_area_encounters, moves, sprites } =
        response.data;

      // Ajuste a estrutura do array 'moves' para extrair 'name' e 'url' de cada objeto 'move'
      const adjustedMoves = moves.map((moveItem) => ({
        name: moveItem.move.name,
        url: moveItem.move.url,
      }));

      return {
        name,
        id,
        location_area_encounters,
        moves: adjustedMoves,
        sprites,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    pokemon: {
      name: "",
      id: null,
      locationAreaEncounters: "",
      moves: [],
      avatar: "",
      pokemonLoading: false
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      const { name, id, location_area_encounters, moves, sprites } =
        action.payload;
      state.pokemon.pokemonLoading = false
      state.pokemon.name = name;
      state.pokemon.id = id;
      state.pokemon.locationAreaEncounters = location_area_encounters;
      state.pokemon.moves = moves;
      state.pokemon.avatar = sprites.front_default;
    })
    .addCase(fetchPokemon.pending, (state) => {
      state.pokemon.pokemonLoading = true
    })
  },
});

export const selectPokemon = (state) => state.user.pokemon;

export default userSlice.reducer;
