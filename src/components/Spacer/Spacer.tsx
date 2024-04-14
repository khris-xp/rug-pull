interface SpacerProps {
  margin?: string;
  padding?: string;
  space?: string;
}

export default function Spacer(props: SpacerProps) {
  return <div className={`${props.margin} ${props.padding} ${props.space}`} />;
}
