import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Organization } from '../../types/organization.types';

interface OrganizationState {
  currentOrganization: Organization | null;
  isLoading: boolean;
}

const initialState: OrganizationState = {
  currentOrganization: null,
  isLoading: false,
};

const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<Organization | null>) => {
      state.currentOrganization = action.payload;
      state.isLoading = false;
    },
    clearOrganization: (state) => {
      state.currentOrganization = null;
      state.isLoading = false;
    },
    setOrgLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setOrganization, clearOrganization, setOrgLoading } = organizationSlice.actions;
export default organizationSlice.reducer;
