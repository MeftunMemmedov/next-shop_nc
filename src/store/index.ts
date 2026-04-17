import { configureStore } from '@reduxjs/toolkit';
import InventoryReducer from './inventory';
import DataReducer from './data';

export const makeStore = () =>
  configureStore({
    reducer: {
      inventory: InventoryReducer,
      data: DataReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;

export type Rootstate = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
