import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  onClick?: () => void;
  text?: string;
  icon?: IconProp;
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
}

interface IVariant {
  color?: string;
  padding: string;
  hoverColor?: string;
  fontSize: string;
  fontWeight: string;
  textColor: string;
  hoverTextColor: string;
  borderRadius: string;
  iconMargin?: string;
  duration?: string;
  textAlign?: string;
  textSize?: string;
}

export default function Button({
  variant,
  ...props
}: {
  variant?: IVariant;
  props: IProps;
}) {
  const defaultVariant: IVariant = {
    color: 'bg-primary',
    padding: 'px-5 py-2.5',
    hoverColor: 'bg-hover',
    fontSize: 'text-sm',
    fontWeight: 'font-normal',
    textColor: 'text-white',
    hoverTextColor: 'text-primary',
    borderRadius: 'rounded-lg',
    iconMargin: 'mr-2',
    duration: 'duration-300',
    textAlign: 'text-left',
    textSize: 'text-xs',
  };

  const mergedVariant = { ...defaultVariant, ...variant };

  const { onClick, text, icon, type, disabled } = props.props;

  return (
    <button
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${mergedVariant.textColor} ${mergedVariant.color} hover:bg-hover hover:text-primary ${mergedVariant.borderRadius} ${mergedVariant.fontSize} ${mergedVariant.fontWeight} ${mergedVariant.padding} ${mergedVariant.duration} focus:outline-none`}
      disabled={disabled}
    >
      <div
        className={`${mergedVariant.textAlign} ${mergedVariant.textSize} flex justify-center items-center`}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`${mergedVariant.iconMargin} h-4 w-4`}
          />
        )}
        {text}
      </div>
    </button>
  );
}
