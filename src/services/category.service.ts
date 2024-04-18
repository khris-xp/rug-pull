import { CateogryDto } from '@/common/dto/category.dto';
import { apiController } from '@/controller/api.controller';
import {
  CategoryModelListResponse,
  CategoryModelResponse,
} from '@/types/response.type';

export const categoryService = {
  getAllCategory: async (): Promise<CategoryModelListResponse> => {
    return await apiController('/api/categories', 'get');
  },
  getCategoryById: async (
    id: string | undefined
  ): Promise<CategoryModelResponse> => {
    return await apiController(`/api/categories/${id}`, 'get');
  },
  createCategory: async (
    categoryRequest: CateogryDto
  ): Promise<CategoryModelResponse> => {
    return await apiController(`/api/categories`, 'post', categoryRequest);
  },
  updateCategory: async (
    id: string | undefined,
    categoryRequest: CateogryDto
  ): Promise<CategoryModelResponse> => {
    return await apiController(`/api/categories/${id}`, 'put', categoryRequest);
  },
  deleteCategory: async (id: string): Promise<CategoryModelResponse> => {
    return await apiController(`/api/categories/${id}`, 'delete');
  },
};
