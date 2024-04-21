import { CateogryDto } from '@/common/dto/category.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateCategoryFields = (
  category: CateogryDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    name: {
      value: category.name,
      errorSetter: setErrors,
      errorMessage: 'Name is required',
    },
    description: {
      value: category.description,
      errorSetter: setErrors,
      errorMessage: 'Description is required',
    },
    topics: {
      value: category.topics,
      errorSetter: setErrors,
      errorMessage: 'Topics is required',
    },
  };
};
