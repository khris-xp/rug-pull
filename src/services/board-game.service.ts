import { apiRepository } from '@/controller/api.controller';
import { BoardGameModelListResponse } from '@/types/response.type';

export const boardGameService = {
  getAllBoardGame: async (
    page: string,
    limit: string
  ): Promise<BoardGameModelListResponse> => {
    return await apiRepository(
      `/api/board-games?page=${page}&limit=${limit}&sortBy=name&sortOrder=asc`,
      'get'
    );
  },
};
