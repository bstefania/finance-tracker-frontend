import styles from "../../styles/molecules/CircleIcon.module.scss";
import Icon, { IconType } from "../atoms/Icon";

type CircleIconProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  icon: IconType;
  color: string;
};

const CircleIcon = ({icon, color, ...extraProps}: CircleIconProps) => {
  return (
    <div
      className={`${styles["icon-parent"]} ${styles["circle"]}`}
      style={{ backgroundColor: color }}
      {...extraProps}
    >
      <div className={`${styles["icon-background"]} ${styles["circle"]}`}>
        <Icon icon={icon as IconType} />
      </div>
    </div>
  );
};

export default CircleIcon;
