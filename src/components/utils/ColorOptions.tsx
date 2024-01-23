import { useEffect, useState } from "react";
import { getRandomColor } from "../../utils/colorPicker";
import styles from "../../styles/utils/ColorOptions.module.scss";

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
    <div className={styles["color-options"]}>
      {availableColors.map((color, index) => (
        <div
          key={index}
          className={`${styles["background"]} ${styles["circle"]} ${
            color === props.chosenColor ? styles["selected-color"] : ""
          }`}
        >
          <div
            className={`${styles["color"]} ${styles["circle"]}`}
            style={{ backgroundColor: color }}
            onClick={() => props.onClick(color)}
          />
        </div>
      ))}
      <div className={`${styles["background-add"]} ${styles["circle"]}`}>
        <div className={`${styles["add-color"]} ${styles["circle"]}`}>+</div>
      </div>
    </div>
  );
};

export default ColorOptions;
