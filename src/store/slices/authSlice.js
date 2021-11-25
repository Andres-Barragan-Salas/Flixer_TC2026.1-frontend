import { createSlice } from '@reduxjs/toolkit';

const retrieveTokenFromLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem('token')) ?? null;
};

const saveTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', JSON.stringify(token));
};

const removeTokenFromLocalStorage = () => {
    window.localStorage.removeItem('token');
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: retrieveTokenFromLocalStorage(),
    },
    reducers: {
        setToken: (_state, { payload }) => {
            const { token } = payload;
            saveTokenToLocalStorage(token);
            return { token };
        }, 
        removeToken: (_state) => {
            removeTokenFromLocalStorage();
            return { token: null };
        }
    }
});

export default authSlice.reducer;
export const { setToken, removeToken } = authSlice.actions;