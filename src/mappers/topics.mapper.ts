import { TopicsDto } from '@/common/dto/topics.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generatedTopicsFields = (
  topics: TopicsDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    title: {
      value: topics.title,
      errorSetter: setErrors,
      errorMessage: 'Title is required',
    },
    description: {
      value: topics.description,
      errorSetter: setErrors,
      errorMessage: 'Description is required',
    },
  };
};
