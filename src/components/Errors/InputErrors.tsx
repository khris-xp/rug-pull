type InputErrorsProps = {
  errors: string;
};

export default function InputErrors(props: InputErrorsProps) {
  return <div className='mt-2 text-sm text-red-600'>{props.errors}</div>;
}
