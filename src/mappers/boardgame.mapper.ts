import { BoardGameDto } from '@/common/dto/board-game.dto';
import { ValidationErrors, ValidationFields } from '@/hooks/useValidate';

export const generateBoardGameFields = (
  boardGame: BoardGameDto,
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>
): ValidationFields => {
  return {
    name: {
      value: boardGame.name,
      errorSetter: setErrors,
      errorMessage: 'Name is required',
    },
    description: {
      value: boardGame.description,
      errorSetter: setErrors,
      errorMessage: 'Description is required',
    },
    price: {
      value: boardGame.price,
      errorSetter: setErrors,
      errorMessage: 'Price is required',
    },
    players_min: {
      value: boardGame.players_min,
      errorSetter: setErrors,
      errorMessage: 'Minimum players is required',
    },
    players_max: {
      value: boardGame.players_max,
      errorSetter: setErrors,
      errorMessage: 'Maximum players is required',
    },
    duration: {
      value: boardGame.duration,
      errorSetter: setErrors,
      errorMessage: 'Duration is required',
    },
    category: {
      value: boardGame.category,
      errorSetter: setErrors,
      errorMessage: 'Category is required',
    },
    publisher: {
      value: boardGame.publisher,
      errorSetter: setErrors,
      errorMessage: 'Publisher is required',
    },
    thumbnail: {
      value: boardGame.thumbnail,
      errorSetter: setErrors,
      errorMessage: 'Thumbnail is required',
    },
  };
};
