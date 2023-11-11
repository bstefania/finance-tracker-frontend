import { useEffect, useState } from "react";
import { getRandomColor } from "../../utils/colorPicker";
import "../../styles/utils/ColorOptions.scss";

const COLOR_NR = 12;

type ColorOptionsProps = {
  onClick: any;
  chosenColor: string;
};

const ColorOptions = (props: ColorOptionsProps) => {
  const [availableColors, setAvailableColors] = useState(
    new Array(COLOR_NR + 1).fill(null)
  );

  useEffect(() => {
    setAvailableColors([
      props.chosenColor,
      ...availableColors.map(() => getRandomColor()),
    ]);
  }, []);

  return (
    <div className="color-options">
      {availableColors.map((color, index) => (
        <div
          key={index}
          className={`background circle ${
            color === props.chosenColor ? "selected-color" : ""
          }`}
        >
          <div
            className="color circle"
            style={{ backgroundColor: color }}
            onClick={() => props.onClick(color)}
          />
        </div>
      ))}
      <div className="background-add circle">
        <div className="circle add-color">+</div>
      </div>
    </div>
  );
};

export default ColorOptions;
