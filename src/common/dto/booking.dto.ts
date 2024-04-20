export type BookingDto = {
  user?: string;
  amount_player: number;
  total_price: number;
  duration: number;
  room_id: string;
  table_id: string;
  board_game_id?: string;
  status: string;
  start_time: string;
  end_time: string;
};
