import { TopicsDto } from '@/common/dto/topics.dto';
import { apiController } from '@/controller/api.controller';
import {
  TopicsModelListResponse,
  TopicsModelResponse,
} from '@/types/response.type';

export const topicsService = {
  getAllTopics: async (): Promise<TopicsModelListResponse> => {
    return await apiController('/api/topics', 'get');
  },
  getTopicsById: async (id: string): Promise<TopicsModelResponse> => {
    return await apiController(`/api/topics/${id}`, 'get');
  },
  createTopics: async (
    topicsRequest: TopicsDto
  ): Promise<TopicsModelResponse> => {
    return await apiController(`/api/topics`, 'post', topicsRequest);
  },
  updateTopics: async (
    id: string,
    topicsRequest: TopicsDto
  ): Promise<TopicsModelResponse> => {
    return await apiController(`/api/topics/${id}`, 'put', topicsRequest);
  },
  deleteTopics: async (id: string): Promise<TopicsModelResponse> => {
    return await apiController(`/api/topics/${id}`, 'delete');
  },
};
