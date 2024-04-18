import { AuthResponseType } from './auth.type';
import {
  BoardGameModelType,
  CommonBoardGameModelType,
} from './board-game.type';
import { CategoryModelType } from './category.type';
import { RoomModelType } from './room.type';
import { StatusModelType } from './status.type';
import { TopicsType } from './topics.type';
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
export type RoomModelListResponse = APIResponseType<RoomModelType[]>;
export type RoomModelResponse = APIResponseType<RoomModelType>;
export type AuthModelResponse = APIResponseType<AuthResponseType>;
export type UserModelResponse = APIResponseType<UserType>;
export type TopicsModelListResponse = APIResponseType<TopicsType[]>;
export type TopicsModelResponse = APIResponseType<TopicsType>;
export type StatusModelListResponse = APIResponseType<StatusModelType[]>;
export type StatusModelResponse = APIResponseType<StatusModelType>;
export type CategoryModelListResponse = APIResponseType<CategoryModelType[]>;
export type CategoryModelResponse = APIResponseType<CategoryModelType>;
