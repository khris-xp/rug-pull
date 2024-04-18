import { apiController } from '@/controller/api.controller';
import { ImageModelResponse } from '@/types/response.type';

export const uploadService = {
  uploadImage: async (formData: FormData): Promise<ImageModelResponse> => {
    return await apiController('/api/uploads/upload', 'post', formData);
  },
  deleteImage: async (public_id: string): Promise<ImageModelResponse> => {
    return await apiController(`/api/uploads/destroy`, 'post', { public_id });
  },
};
