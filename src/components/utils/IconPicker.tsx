import { Dispatch, SetStateAction, useRef, useState } from "react";
import AvailableIcons from "../../data/AvailableIcons";
import CircleIcon from "../atoms/CircleIcon";
import ColorOptions from "./ColorOptions";
import "../../styles/utils/Picker.scss";
import "../../styles/common.scss";
import { useOutsideClick } from "../../hooks/useOutsideClick";

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
    <div className="picker-icon" ref={ref}>
      <CircleIcon
        color={props.color}
        icon={props.icon as any}
        onClick={() => setPickIcon(!pickIcon)}
      />
      {pickIcon && (
        <div className="picker-parent">
          <div className="picker-content">
            <div className="colors">
              <span>Choose a color:</span>
              <ColorOptions
                chosenColor={props.color}
                onClick={props.setColor}
              />
            </div>
            <div className="icons">
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
