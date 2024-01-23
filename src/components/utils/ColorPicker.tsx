import { Dispatch, SetStateAction, useState } from "react";

import { ChromePicker } from "react-color";
import styles from "../../styles/utils/Picker.module.scss";

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [pickAColor, setPickAColor] = useState(false);

  return (
    <div
      className={styles["picker-button"]}
      onClick={() => {
        setPickAColor(!pickAColor);
      }}
      style={{ backgroundColor: color }}
    >
      {pickAColor && (
        <div className={styles["picker-parent"]}>
          <ChromePicker
            color={color}
            onChange={(newColor) => setColor(newColor.hex)}
          />
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
