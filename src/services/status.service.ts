import { StatusDto } from '@/common/dto/status.dto';
import { apiController } from '@/controller/api.controller';
import {
  StatusModelListResponse,
  StatusModelResponse,
} from '@/types/response.type';

export const statusService = {
  getAllStatus: async (): Promise<StatusModelListResponse> => {
    return await apiController('/api/statuses', 'get');
  },
  getStatusById: async (
    id: string | undefined
  ): Promise<StatusModelResponse> => {
    return await apiController(`/api/statuses/${id}`, 'get');
  },
  createStatus: async (
    statusRequest: StatusDto
  ): Promise<StatusModelResponse> => {
    return await apiController(`/api/statuses`, 'post', statusRequest);
  },
  updateStatus: async (
    id: string | undefined,
    statusRequest: StatusDto
  ): Promise<StatusModelResponse> => {
    return await apiController(`/api/statuses/${id}`, 'put', statusRequest);
  },
  deleteStatus: async (id: string): Promise<StatusModelResponse> => {
    return await apiController(`/api/statuses/${id}`, 'delete');
  },
};
