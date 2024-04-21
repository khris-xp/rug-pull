import { ChangeEvent } from 'react';

interface ISelectOption {
  id: string;
  value: string;
}

interface IInputProps {
  variant: 'text' | 'number' | 'textarea' | 'select' | 'password' | 'email';
  placeholder?: string;
  value?: string | number;
  isFull?: boolean;
  selectOptions?: ISelectOption[];
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  row?: number;
  disabled?: boolean;
}

const Input: React.FC<{ props: IInputProps }> = ({ props }) => {
  const inputClasses = `${props.isFull ? 'w-full' : ''} input input-bordered`;

  switch (props.variant) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
      return (
        <input
          type={props.variant}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={inputClasses}
          disabled={props.disabled}
        />
      );

    case 'textarea':
      return (
        <textarea
          placeholder={props.placeholder}
          value={props.value}
          rows={props.row}
          onChange={props.onChange}
          className={inputClasses}
        />
      );

    case 'select':
      return (
        <select onChange={props.onChange} className={inputClasses}>
          {props.selectOptions?.map((option) => (
            <option value={option.id} key={option.id}>
              {option.value}
            </option>
          ))}
        </select>
      );

    default:
      return (
        <div>
          <p>This variant is not provided</p>
        </div>
      );
  }
};

export default Input;
