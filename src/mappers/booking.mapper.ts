import { BookingDto } from '@/common/dto/booking.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateBookingFields = (
  booking: BookingDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    user: {
      value: booking.user,
      errorSetter: setErrors,
      errorMessage: 'User is required',
    },
    amountPlayer: {
      value: booking.amount_player,
      errorSetter: setErrors,
      errorMessage: 'Amount player is required',
    },
    totalPrice: {
      value: booking.total_price,
      errorSetter: setErrors,
      errorMessage: 'Total price is required',
    },
    duration: {
      value: booking.duration,
      errorSetter: setErrors,
      errorMessage: 'Duration is required',
    },
    roomId: {
      value: booking.room_id,
      errorSetter: setErrors,
      errorMessage: 'Room is required',
    },
    boardGameId: {
      value: booking.board_game_id,
      errorSetter: setErrors,
      errorMessage: 'Board game is required',
    },
    tableId: {
      value: booking.table_id,
      errorSetter: setErrors,
      errorMessage: 'Table is required',
    },
    status: {
      value: booking.status,
      errorSetter: setErrors,
      errorMessage: 'Status is required',
    },
    startTime: {
      value: booking.start_time,
      errorSetter: setErrors,
      errorMessage: 'Start time is required',
    },
    endTime: {
      value: booking.end_time,
      errorSetter: setErrors,
      errorMessage: 'End time is required',
    },
  };
};
