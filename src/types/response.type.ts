import { AuthResponseType } from './auth.type';
import { CommonBoardGameModelType } from './board-game.type';
import { UserType } from './user.type';

export type APIResponseType<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};

export type BoardGameModelListResponse =
  APIResponseType<CommonBoardGameModelType>;
export type BoardGameModelResponse = APIResponseType<CommonBoardGameModelType>;
export type AuthModelResponse = APIResponseType<AuthResponseType>;
export type UserModelResponse = APIResponseType<UserType>;
