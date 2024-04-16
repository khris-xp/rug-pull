import { apiRepository } from '@/controller/api.controller';
import { UserModelResponse } from '@/types/response.type';

export const userService = {
  getUser: async (): Promise<UserModelResponse> => {
    return await apiRepository(`/api/auth/profile`, 'get');
  },
};
