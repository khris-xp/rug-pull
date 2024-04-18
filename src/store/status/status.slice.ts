import { StatusModelType } from '@/types/status.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatusAppState {
  statusList: StatusModelType[];
  status: StatusModelType | null;
}

const initialState: StatusAppState = {
  statusList: [],
  status: null,
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatusList: (state, action: PayloadAction<StatusModelType[]>) => {
      state.statusList = action.payload;
    },
    setStatus: (state, action: PayloadAction<StatusModelType>) => {
      state.status = action.payload;
    },
    deleteStatus: (state) => {
      state.status = null;
    },
  },
});

export const { setStatusList, setStatus, deleteStatus } = statusSlice.actions;
