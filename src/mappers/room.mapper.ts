import { RoomDto } from '@/common/dto/room.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateRoomFields = (
  room: RoomDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    name: {
      value: room.name,
      errorSetter: setErrors,
      errorMessage: 'Name is required',
    },
    status: {
      value: room.status,
      errorSetter: setErrors,
      errorMessage: 'Status is required',
    },
    capacity: {
      value: room.capacity,
      errorSetter: setErrors,
      errorMessage: 'Capacity is required',
    },
    tables: {
      value: room.tables,
      errorSetter: setErrors,
      errorMessage: 'Tables is required',
    },
  };
};
