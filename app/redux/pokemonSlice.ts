import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  searchTerm: string;
  orderBy: string;
}

const initialState: PokemonState = {
  searchTerm: '',
  orderBy: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload;
    },
  },
});

export const { setSearchTerm, setOrderBy } = pokemonSlice.actions;
export default pokemonSlice.reducer;
