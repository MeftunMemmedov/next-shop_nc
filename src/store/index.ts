import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './inventory';

export const makeStore = () =>
  configureStore({
    reducer: {
      inventory: InventoryReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type Rootstate = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
