import Icon, { IconType } from "../atoms/Icon";
import styles from "../../styles/molecules/Input.module.scss";
import Dropdown from "./Dropdown";

type InputProps = React.HtmlHTMLAttributes<HTMLInputElement> & {
  icon: string;
  label?: string;
  isTextArea?: boolean;
  isDropdown?: boolean;
  error?: string;
};

const Input = ({
  disabled,
  icon,
  id,
  label,
  isTextArea,
  isDropdown,
  error,
  children,
  ...extraProps
}: any) => {
  const isInput = !isTextArea && !isDropdown;
  let className = styles["modal-field"];

  if (disabled) {
    className += ` ${styles["disabled"]}`;
  }

  return (
    <>
      <div className={className}>
        <Icon icon={icon as IconType} />
        {label && <label htmlFor={id}>{label}</label>}
        {isInput && <input id={id} {...extraProps} />}
        {isTextArea && <textarea id={id} {...extraProps} />}
        {isDropdown && <Dropdown {...extraProps} />}
        {children}
      </div>
      {error && <div>{error}</div>}
    </>
  );
};

export default Input;
