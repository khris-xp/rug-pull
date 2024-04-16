import { LoginDto, RegisterDto } from '@/common/dto/auth.dto';
import { apiRepository } from '@/controller/api.controller';
import { AuthModelResponse } from '@/types/response.type';

export const authService = {
  login: async (loginRequest: LoginDto): Promise<AuthModelResponse> => {
    return await apiRepository('/api/auth/login', 'post', loginRequest);
  },
  register: async (
    registerRequest: RegisterDto
  ): Promise<AuthModelResponse> => {
    return await apiRepository('/api/auth/register', 'post', registerRequest);
  },
};
