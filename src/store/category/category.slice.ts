import { CategoryModelType } from '@/types/category.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryAppState {
  categoryList: CategoryModelType[];
  category: CategoryModelType | null;
}

const initialState: CategoryAppState = {
  categoryList: [],
  category: null,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoryList: (state, action: PayloadAction<CategoryModelType[]>) => {
      state.categoryList = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryModelType>) => {
      state.category = action.payload;
    },
    deleteCategory: (state) => {
      state.category = null;
    },
  },
});

export const { setCategoryList, setCategory, deleteCategory } = categorySlice.actions;