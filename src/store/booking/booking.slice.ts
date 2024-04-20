import { BookingModelType } from '@/types/booking.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingAppState {
  bookingList: BookingModelType[];
  booking: BookingModelType | null;
}

const initialState: BookingAppState = {
  bookingList: [],
  booking: null,
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingList: (state, action: PayloadAction<BookingModelType[]>) => {
      state.bookingList = action.payload;
    },
    setBooking: (state, action: PayloadAction<BookingModelType>) => {
      state.booking = action.payload;
    },
    deleteBooking: (state) => {
      state.booking = null;
    },
  },
});

export const { setBookingList, setBooking, deleteBooking } =
  bookingSlice.actions;
