import { StatusDto } from '@/common/dto/status.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateStatusFields = (
  status: StatusDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    name: {
      value: status.name,
      errorSetter: setErrors,
      errorMessage: 'Name is required',
    },
    description: {
      value: status.description,
      errorSetter: setErrors,
      errorMessage: 'Description is required',
    },
    topics: {
      value: status.topics,
      errorSetter: setErrors,
      errorMessage: 'Topics is required',
    },
  };
};
