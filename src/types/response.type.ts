import { AuthResponseType } from './auth.type';
import {
  BoardGameModelType,
  CommonBoardGameModelType,
} from './board-game.type';
import { UserType } from './user.type';

export type APIResponseType<T> = {
  status: number;
  message: string;
  success: boolean;
  data: T;
};

export type BoardGameModelListResponse =
  APIResponseType<CommonBoardGameModelType>;
export type BoardGameModelResponse = APIResponseType<BoardGameModelType>;
export type AuthModelResponse = APIResponseType<AuthResponseType>;
export type UserModelResponse = APIResponseType<UserType>;
