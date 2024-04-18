interface IVariant {
  display?: string;
  justifyContent?: string;
  margin?: string;
  container?: boolean;
}

interface ContainerProps {
  variant?: IVariant;
  children: React.ReactNode;
}

export default function Container({ variant, children }: ContainerProps) {
  const defaultVariant: IVariant = {
    display: 'flex',
    justifyContent: 'center',
    margin: 'mx-auto',
    container: true,
  };

  const mergedVariant = { ...defaultVariant, ...variant };

  return (
    <div
      className={`${mergedVariant.display} ${mergedVariant.justifyContent} ${
        mergedVariant.margin
      } ${mergedVariant.container && 'container'}`}
    >
      {children}
    </div>
  );
}
