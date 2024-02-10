import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "../../styles/atoms/Button.module.scss";
import Icon from "./Icon";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  icon?: string;
};

function Button({ primary, secondary, tertiary, icon, children, ...extraProps }: ButtonProps) {
  let classList = [extraProps.className || ""];
  if (secondary) {
    classList.push(styles["button--secondary"]);
  }
  if (tertiary) {
    classList.push(styles["button--tertiary"]);
  }
  if (icon && !children) {
    classList.push(styles["button--icon"]);
  }

  const className = classList.join(" ");

  return <button className={className} {...extraProps}>
    {icon && <Icon icon={icon as IconProp} />}
    {children}
    </button>;
}

export default Button;
