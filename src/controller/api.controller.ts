import { LoginDto, RegisterDto } from '@/common/dto/auth.dto';
import { BoardGameDto } from '@/common/dto/board-game.dto';
import { BookingDto, UpdateBookingDto } from '@/common/dto/booking.dto';
import { CateogryDto } from '@/common/dto/category.dto';
import { PaymentDto } from '@/common/dto/payment.dto';
import { RoomDto } from '@/common/dto/room.dto';
import { StatusDto } from '@/common/dto/status.dto';
import { TableDto } from '@/common/dto/table.dto';
import { TopicsDto } from '@/common/dto/topics.dto';
import axiosInstance from '@/services/api.service';

export async function apiController<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?:
    | LoginDto
    | RegisterDto
    | BoardGameDto
    | RoomDto
    | TopicsDto
    | StatusDto
    | CateogryDto
    | TableDto
    | FormData
    | BookingDto
    | UpdateBookingDto
    | PaymentDto
    | { public_id: string }
    | { user_id: string }
): Promise<T> {
  try {
    const response = await axiosInstance.request({ url, method, data });
    return response.data;
  } catch (error) {
    const message = (error as Error).message;
    return Promise.reject(message);
  }
}
