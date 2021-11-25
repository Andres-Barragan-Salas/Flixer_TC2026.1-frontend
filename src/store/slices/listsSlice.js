import { createSlice } from '@reduxjs/toolkit';

export const listsSlice = createSlice({
    name: 'lists',
    initialState: [],
    reducers: {
        setLists: (_state, { payload }) => {
            return payload;
        }
    }
});

export default listsSlice.reducer;
export const { setLists } = listsSlice.actions;