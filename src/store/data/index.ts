import { Category } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type DataStateProps = {
  categories: Category[] | null;
  user: {
    id: string;
    email: string;
    username: string;
  } | null;
};

const initialState: DataStateProps = {
  categories: null,
  user: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setCategory, setUser } = slice.actions;
export default slice.reducer;
