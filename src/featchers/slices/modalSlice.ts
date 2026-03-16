import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IProcedure } from '../../data/procedures';

interface modalState {
  isOpen: boolean;
  procedure: IProcedure | null;
}

const initialState: modalState = {
  isOpen: false,
  procedure: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IProcedure>) => {
      state.isOpen = true;
      state.procedure = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.procedure = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
