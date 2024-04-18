import { TableModelType } from '@/types/table.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableAppState {
  tableList: TableModelType[];
  table: TableModelType | null;
}

const initialState: TableAppState = {
  tableList: [],
  table: null,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableList: (state, action: PayloadAction<TableModelType[]>) => {
      state.tableList = action.payload;
    },
    setTable: (state, action: PayloadAction<TableModelType>) => {
      state.table = action.payload;
    },
    deleteTable: (state) => {
      state.table = null;
    },
  },
});

export const { setTableList, setTable, deleteTable } = tableSlice.actions;
