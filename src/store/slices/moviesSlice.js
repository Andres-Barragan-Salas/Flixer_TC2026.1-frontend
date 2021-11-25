import { createSlice } from '@reduxjs/toolkit';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: [],
    reducers: {
        setMovies: (_state, { payload }) => {
            return payload;
        }
    }
});

export default moviesSlice.reducer;
export const { setMovies } = moviesSlice.actions;