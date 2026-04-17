import { initialStatus, Status } from '@/constants/status';
import { Category } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type DataStateProps = {
  categories: Category[] | null;
  status: {
    category: Status;
  };
};

const initialState: DataStateProps = {
  categories: null,
  status: {
    category: initialStatus,
  },
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.categories = payload;
    },
  },
});

export const { setCategory } = slice.actions;
export default slice.reducer;
