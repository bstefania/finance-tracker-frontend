import { Dispatch, SetStateAction, useState } from "react";

import { ChromePicker } from "react-color";
import "../../styles/utils/Picker.scss";

type ColorPickerProps = {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
};

function ColorPicker({ color, setColor }: ColorPickerProps) {
  const [pickAColor, setPickAColor] = useState(false);

  return (
    <div
      className="picker-button"
      onClick={() => {
        setPickAColor(!pickAColor);
      }}
      style={{ backgroundColor: color }}
    >
      {pickAColor && (
        <div className="picker-parent">
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
