import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/atoms/CircleIcon.module.scss";

type CircleIconProps = {
  icon: IconDefinition;
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
        <FontAwesomeIcon icon={props.icon} className={styles["icon"]} />
      </div>
    </div>
  );
};

export default CircleIcon;
