export type CommonBoardGameModelType = {
  data: BoardGameModelType[];
  page: number;
  limit: number;
};

export type BoardGameModelDataType = {
  boardGames: CommonBoardGameModelType;
  totalPages: number;
  currentPage: number;
  totalItems: number;
};

export type BoardGameModelType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  players_min: number;
  players_max: number;
  duration: number;
  category: string;
  publisher: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
