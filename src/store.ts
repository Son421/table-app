import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/userSlice';
import uiReducer from './features/uiSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;