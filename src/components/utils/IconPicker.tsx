import { Dispatch, SetStateAction, useRef, useState } from "react";
import AvailableIcons from "../../data/AvailableIcons";
import CircleIcon from "../molecules/CircleIcon";
import ColorOptions from "./ColorOptions";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import styles from "../../styles/utils/Picker.module.scss";

type IconPickerProps = {
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

function IconPicker(props: IconPickerProps) {
  const [pickIcon, setPickIcon] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useOutsideClick(ref, () => setPickIcon(false))

  return (
    <div className={styles["picker-icon"]} ref={ref}>
      <CircleIcon
        color={props.color}
        icon={props.icon as any}
        onClick={() => setPickIcon(!pickIcon)}
      />
      {pickIcon && (
        <div className={styles["picker-parent"]}>
          <div className={styles["picker-content"]}>
            <div className={styles["colors"]}>
              <span>Choose a color:</span>
              <ColorOptions
                chosenColor={props.color}
                onClick={props.setColor}
              />
            </div>
            <div className={styles["icons"]}>
              <span>Choose an icon:</span>
              <AvailableIcons chosenIcon={props.icon} onClick={props.setIcon} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IconPicker;
