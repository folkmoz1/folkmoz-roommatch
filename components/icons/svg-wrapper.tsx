interface Props extends React.ComponentProps<'svg'> {
  size?: number;
  color?: string;
  strokeWidth?: number;
  viewBox?: string;
  children?: React.ReactNode;
  rest?: React.ComponentProps<'svg'>;
}

export const SvgWrapper = (props: Props) => {
  const defaultProps = {
    size: 24,
    color: 'currentColor',
    strokeWidth: 2,
    viewBox: '0 0 48 48',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox={props.viewBox || defaultProps.viewBox}
      fill="none"
      stroke={props.color}
      strokeWidth={props.strokeWidth}
      {...props.rest}
    >
      {props.children}
    </svg>
  );
};
