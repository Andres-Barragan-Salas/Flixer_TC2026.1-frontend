import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: null,
        email: null,
        likedMovies: [],
        unlikedMovies: []
    },
    reducers: {
        setUser: (_state, { payload }) => {
            return { ...payload };
        },
        resetUser: () => {
            return { username: null, email: null, likedMovies: [], unlikedMovies: [] };
        }
    }
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
