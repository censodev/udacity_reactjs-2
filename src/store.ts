import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import questReducer from './slices/questSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        quest: questReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
export default store
export type RootState = ReturnType<typeof store.getState>