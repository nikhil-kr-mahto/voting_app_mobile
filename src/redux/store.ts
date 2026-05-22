import { configureStore } from '@reduxjs/toolkit';
import voterReducer from './slices/votersSlice';

const store = configureStore({
  reducer: {
    voter: voterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
