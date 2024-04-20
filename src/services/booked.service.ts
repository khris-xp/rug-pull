import { BookingDto } from '@/common/dto/booking.dto';
import { apiController } from '@/controller/api.controller';
import {
  BookingModelListResponse,
  BookingModelResponse,
} from '@/types/response.type';

export const bookingController = {
  getBookings: async (): Promise<BookingModelListResponse> => {
    return await apiController<BookingModelListResponse>('/bookings', 'get');
  },
  getBooking: async (id: string | undefined): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(`/bookings/${id}`, 'get');
  },
  createBooking: async (data: BookingDto): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>('/bookings', 'post', data);
  },
  updateBooking: async (
    id: string | undefined,
    data: BookingDto
  ): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      `/bookings/${id}`,
      'put',
      data
    );
  },
  deleteBooking: async (id: string): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      `/bookings/${id}`,
      'delete'
    );
  },
};
