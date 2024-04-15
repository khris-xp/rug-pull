import axiosInstance from '@/services/api.service';
import { BoardGameModelListResponse } from '@/types/response.type';

export async function apiRepository<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  data?: BoardGameModelListResponse
): Promise<T> {
  try {
    const response = await axiosInstance.request({ url, method, data });
    return response.data;
  } catch (error) {
    const message = (error as Error).message;
    return Promise.reject(message);
  }
}
