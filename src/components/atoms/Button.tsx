type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  secondary?: boolean;
};

function Button({ primary, secondary, children, ...otherProps }: ButtonProps) {
  return <button {...otherProps}>{children}</button>;
}

export default Button;
