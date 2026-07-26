import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  activeModal: string | null;
  modalData: unknown;
}

const initialState: UiState = {
  sidebarOpen: true,
  activeModal: null,
  modalData: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<{ modalId: string; data?: unknown }>) => {
      state.activeModal = action.payload.modalId;
      state.modalData = action.payload.data ?? null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalData = null;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
