import { apiController } from '@/controller/api.controller';
import { UserModelResponse } from '@/types/response.type';

export const userService = {
  getUser: async (): Promise<UserModelResponse> => {
    return await apiController(`/api/auth/profile`, 'get');
  },
};
