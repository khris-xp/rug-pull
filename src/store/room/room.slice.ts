import { RoomModelType } from '@/types/room.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RoomAppState {
  roomList: RoomModelType[];
  room: RoomModelType | null;
}

const initialState: RoomAppState = {
  roomList: [],
  room: null,
};

export const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomList: (state, action: PayloadAction<RoomModelType[]>) => {
      state.roomList = action.payload;
    },
    setRoom: (state, action: PayloadAction<RoomModelType>) => {
      state.room = action.payload;
    },
    deleteRoom: (state) => {
      state.room = null;
    },
  },
});

export const { setRoomList, setRoom, deleteRoom } = roomSlice.actions;
