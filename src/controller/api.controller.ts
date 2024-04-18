import { LoginDto, RegisterDto } from '@/common/dto/auth.dto';
import { BoardGameDto } from '@/common/dto/board-game.dto';
import { CateogryDto } from '@/common/dto/category.dto';
import { RoomDto } from '@/common/dto/room.dto';
import { StatusDto } from '@/common/dto/status.dto';
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
): Promise<T> {
  try {
    const response = await axiosInstance.request({ url, method, data });
    return response.data;
  } catch (error) {
    const message = (error as Error).message;
    return Promise.reject(message);
  }
}
