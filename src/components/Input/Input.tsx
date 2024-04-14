import { ChangeEvent } from 'react';
interface ISelectProps {
  id: string;
  value: string;
}

interface IInputBoxProps {
  variant: 'text' | 'number' | 'textarea' | 'select' | 'password';
  placeholder?: string;
  value?: string;
  isFull?: boolean;
  selectOption?: Array<ISelectProps>;
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  row?: number;
}

const defaultProps: IInputBoxProps = {
  variant: 'text',
  placeholder: '',
  isFull: true,
  onChange: () => {},
};

export default function InputBox({
  props = defaultProps,
}: {
  props: IInputBoxProps;
}) {
  return props?.variant == 'text' ||
    props?.variant == 'number' ||
    props.variant == 'password' ? (
    <input
      type={props.variant}
      value={props.value}
      onChange={(e) => props?.onChange(e)}
      placeholder={props.placeholder}
      className={`rounded-xl p-2 text-lg transition-all duration-200 border-gray-300 border-2 ${
        props.isFull ? 'w-full' : ''
      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-opacity-0`}
    />
  ) : props?.variant === 'textarea' ? (
    <textarea
      placeholder={props.placeholder}
      value={props.value}
      rows={props.row}
      onChange={(e) => props?.onChange(e)}
      className={`rounded-xl p-2 text-lg transition-all duration-200 border-gray-300 border-2 ${
        props.isFull ? 'w-full' : ''
      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-opacity-0`}
    />
  ) : props?.variant === 'select' ? (
    <select
      onChange={(e) => props?.onChange(e)}
      className={`rounded-xl p-2 text-lg transition-all duration-200 border-gray-300 border-2 ${
        props.isFull ? 'w-full' : ''
      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-opacity-0`}
    >
      {props.selectOption?.map((item: ISelectProps) => {
        return (
          <option value={item.id} key={item.id}>
            {item.value}
          </option>
        );
      })}
    </select>
  ) : (
    <div>
      <p>This variant not provide</p>
    </div>
  );
}
