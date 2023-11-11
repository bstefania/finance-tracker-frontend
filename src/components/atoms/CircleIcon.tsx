import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/atoms/CircleIcon.scss";
import "../../styles/common.scss";

type CircleIconProps = {
  icon: IconDefinition;
  color: string;
  onClick?: any;
};

const CircleIcon = (props: CircleIconProps) => {
  return (
    <div
      className="icon-parent circle"
      style={{ backgroundColor: props.color }}
      onClick={props.onClick}
    >
      <div className="icon-background circle">
        <FontAwesomeIcon icon={props.icon} className="icon" />
      </div>
    </div>
  );
};

export default CircleIcon;
