import { AuthResponseType } from './auth.type';
import { CommonBoardGameModelType } from './board-game.type';

export type APIResponseType<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};

export type BoardGameModelListResponse =
  APIResponseType<CommonBoardGameModelType>;
export type AuthModelResponse = APIResponseType<AuthResponseType>;
