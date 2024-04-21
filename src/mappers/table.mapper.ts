import { TableDto } from '@/common/dto/table.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateTableFields = (
  table: TableDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    number: {
      value: table.number,
      errorSetter: setErrors,
      errorMessage: 'Number is required',
    },
    capacity: {
      value: table.capacity,
      errorSetter: setErrors,
      errorMessage: 'Capacity is required',
    },
  };
};
