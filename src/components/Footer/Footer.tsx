import { FooterTypes } from '@/types/footer.type';

type FooterProps = {
  footer: FooterTypes[];
};

type VariantsType = {
  backgroundColor?: string;
  padding?: string;
  textColor?: string;
};

export default function Footer({
  variant,
  props,
}: {
  variant?: VariantsType;
  props: FooterProps;
}) {
  const defaultVariant: VariantsType = {
    backgroundColor: 'bg-primary',
    padding: 'p-10',
    textColor: 'text-light',
  };

  const mergedVariant = { ...defaultVariant, ...variant };
  return (
    <footer
      className={`footer ${mergedVariant.padding} ${mergedVariant.backgroundColor} ${mergedVariant.textColor}`}
    >
      {props.footer.map((item, index) => (
        <nav key={index}>
          <h6 className='footer-title'>{item.title}</h6>
          {item.navigation.map((nav, index) => (
            <a className='link link-hover' key={index}>
              {nav}
            </a>
          ))}
        </nav>
      ))}
    </footer>
  );
}
