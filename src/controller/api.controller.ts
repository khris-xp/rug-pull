import { LoginDto, RegisterDto } from '@/common/dto/auth.dto';
import { BoardGameDto } from '@/common/dto/board-game.dto';
import axiosInstance from '@/services/api.service';

export async function apiRepository<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?: LoginDto | RegisterDto | BoardGameDto
): Promise<T> {
  try {
    const response = await axiosInstance.request({ url, method, data });
    return response.data;
  } catch (error) {
    const message = (error as Error).message;
    return Promise.reject(message);
  }
}
