import { BookingDto, UpdateBookingDto } from '@/common/dto/booking.dto';
import { apiController } from '@/controller/api.controller';
import {
  BookingListResponse,
  BookingModelListResponse,
  BookingModelResponse,
} from '@/types/response.type';

export const bookingService = {
  getBookings: async (
    page: string,
    limit: string
  ): Promise<BookingModelListResponse> => {
    return await apiController<BookingModelListResponse>(
      `/api/bookings?page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=asc`,
      'get'
    );
  },
  getBooking: async (id: string | undefined): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      `/api/bookings/${id}`,
      'get'
    );
  },
  getBookingByUserId: async (userId: string): Promise<BookingListResponse> => {
    return await apiController<BookingListResponse>(
      '/api/bookings/user',
      'post',
      { user_id: userId }
    );
  },
  createBooking: async (data: BookingDto): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      '/api/bookings',
      'post',
      data
    );
  },
  updateBooking: async (
    id: string | undefined,
    data: UpdateBookingDto
  ): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      `/api/bookings/${id}`,
      'put',
      data
    );
  },
  deleteBooking: async (id: string): Promise<BookingModelResponse> => {
    return await apiController<BookingModelResponse>(
      `/api/bookings/${id}`,
      'delete'
    );
  },
};
