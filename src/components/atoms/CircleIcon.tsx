import styles from "../../styles/atoms/CircleIcon.module.scss";
import Icon, { IconType } from "./Icon";

type CircleIconProps = {
  icon: IconType;
  color: string;
  onClick?: any;
};

const CircleIcon = (props: CircleIconProps) => {
  return (
    <div
      className={`${styles["icon-parent"]} ${styles["circle"]}`}
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      <div className={`${styles["icon-background"]} ${styles["circle"]}`}>
        <Icon icon={props.icon as IconType} />
      </div>
    </div>
  );
};

export default CircleIcon;
