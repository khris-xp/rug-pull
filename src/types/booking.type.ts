export type BookingModelType = {
  _id: string;
  board_game_id: string;
  room_id: string;
  table_id: string;
  user: string;
  start_time: string;
  end_time: string;
  status: string;
  duration: number;
  total_price: number;
  amount_player: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};