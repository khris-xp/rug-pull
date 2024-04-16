import { BoardGameModelType } from '@/types/board-game.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BoardGameAppState {
  boardGameList: BoardGameModelType[];
  boardGame: BoardGameModelType | null;
}

const initialState: BoardGameAppState = {
  boardGameList: [],
  boardGame: null,
};

export const boardGameSlice = createSlice({
  name: 'boardGame',
  initialState,
  reducers: {
    setBoardGameList: (state, action: PayloadAction<BoardGameModelType[]>) => {
      state.boardGameList = action.payload;
    },
    setBoardGame: (state, action: PayloadAction<BoardGameModelType>) => {
      state.boardGame = action.payload;
    },
    deleteBoardGame: (state) => {
      state.boardGame = null;
    },
  },
});

export const { setBoardGameList, setBoardGame, deleteBoardGame } =
  boardGameSlice.actions;
