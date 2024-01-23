import styles from "../../styles/atoms/Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  secondary?: boolean;
};

function Button({ primary, secondary, children, ...extraProps }: ButtonProps) {
  let classList = [extraProps.className || ""];
  if (secondary) {
    classList.push(styles["button--secondary"]);
  }
  const className = classList.join(" ");

  return <button className={className} {...extraProps}>{children}</button>;
}

export default Button;
