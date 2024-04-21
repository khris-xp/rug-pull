import { AuthResponseType } from './auth.type';
import {
  BoardGameModelType,
  CommonBoardGameModelType,
} from './board-game.type';
import { BookingModelType, CommonBookingModelType } from './booking.type';
import { CategoryModelType } from './category.type';
import { PaymentType } from './payment.type';
import { RoomModelType } from './room.type';
import { StatusModelType } from './status.type';
import { TableModelType } from './table.type';
import { TopicsType } from './topics.type';
import { ImageModelType } from './upload.type';
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
export type TableModelListResponse = APIResponseType<TableModelType[]>;
export type TableModelResponse = APIResponseType<TableModelType>;
export type ImageModelResponse = APIResponseType<ImageModelType>;
export type BookingModelListResponse = APIResponseType<CommonBookingModelType>;
export type BookingModelResponse = APIResponseType<BookingModelType>;
export type PaymentModelResponse = APIResponseType<PaymentType>;
