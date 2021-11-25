import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import listsReducer from './slices/listsSlice';
import moviesReducer from './slices/moviesSlice';
import userReducer from './slices/userSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        lists: listsReducer,
        movies: moviesReducer,
        user: userReducer
    }
});