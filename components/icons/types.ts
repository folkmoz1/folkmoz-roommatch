export interface CustomIconProps extends React.ComponentProps<'svg'> {
  size?: number;
  color?: string;
  strokeWidth?: number;
  pathClass?: string;
  viewBox?: string;
}
