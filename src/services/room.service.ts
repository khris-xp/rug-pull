import { RoomDto } from '@/common/dto/room.dto';
import { apiController } from '@/controller/api.controller';
import {
  RoomModelListResponse,
  RoomModelResponse,
} from '@/types/response.type';

export const roomService = {
  getAllRoom: async (): Promise<RoomModelListResponse> => {
    return await apiController('/api/rooms', 'get');
  },
  getRoomById: async (id: string | undefined): Promise<RoomModelResponse> => {
    return await apiController(`/api/rooms/${id}`, 'get');
  },
  createRoom: async (roomRequest: RoomDto): Promise<RoomModelResponse> => {
    return await apiController(`/api/rooms`, 'post', roomRequest);
  },
  updateRoom: async (
    id: string | undefined,
    roomRequest: RoomDto
  ): Promise<RoomModelResponse> => {
    return await apiController(`/api/rooms/${id}`, 'put', roomRequest);
  },
  deleteRoom: async (id: string): Promise<RoomModelResponse> => {
    return await apiController(`/api/rooms/${id}`, 'delete');
  },
};
