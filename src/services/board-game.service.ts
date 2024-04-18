import { BoardGameDto } from '@/common/dto/board-game.dto';
import { apiController } from '@/controller/api.controller';
import {
  BoardGameModelListResponse,
  BoardGameModelResponse,
} from '@/types/response.type';

export const boardGameService = {
  getAllBoardGame: async (
    page: string,
    limit: string
  ): Promise<BoardGameModelListResponse> => {
    return await apiController(
      `/api/board-games?page=${page}&limit=${limit}&sortBy=name&sortOrder=asc`,
      'get'
    );
  },
  getBoardGameById: async (
    id: string | undefined
  ): Promise<BoardGameModelResponse> => {
    return await apiController(`/api/board-games/${id}`, 'get');
  },
  createBoardGame: async (
    boardGameRequest: BoardGameDto
  ): Promise<BoardGameModelResponse> => {
    return await apiController(`/api/board-games`, 'post', boardGameRequest);
  },
  updateBoardGame: async (
    id: string | undefined,
    boardGameRequest: BoardGameDto
  ): Promise<BoardGameModelResponse> => {
    return await apiController(
      `/api/board-games/${id}`,
      'put',
      boardGameRequest
    );
  },
  deleteBoardGame: async (id: string): Promise<BoardGameModelResponse> => {
    return await apiController(`/api/board-games/${id}`, 'delete');
  },
};
