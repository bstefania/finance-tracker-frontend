import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styles from "../styles/utils/Picker.module.scss"

type AvailableIconsProps = {
  onClick: any;
  chosenIcon: string;
};
const AvailableIcons = (props: AvailableIconsProps) => {
  const icons = [
    "store",
    "cart-shopping",
    "basket-shopping",
    "bag-shopping",
    "shirt",
    "socks",
    "shoe-prints",
    "gem",

    "utensil-spoon",
    "kitchen-set",
    "pizza-slice",
    "burger",
    "hotdog",
    "bowl-rice",
    "mug-hot",
    "wine-glass",

    "spa",
    "soap",
    "scissors",
    "glasses",
    "wand-magic-sparkles",
    "spray-can-sparkles",
    "hand-sparkles",
    "ring",

    "key",
    "house",
    "couch",
    "plug",
    "water",
    "fire",
    "mobile",
    "phone",
    "wifi",
    "broom",
    "trash",
    "wind",
    "fan",
    "shower",

    "brush",
    "paint-brush",
    "paint-roller",
    "hammer",

    "gear",
    "toolbox",
    "oil-can",
    "car-burst",
    "house-crack",
    "wrench",

    "car",
    "motorcycle",
    "gas-pump",
    "charging-station",
    "parking",
    "taxi",
    "bus",
    "train",

    "tv",
    "laptop",
    "headphones",

    "brain",
    "person-swimming",
    "futbol",
    "volleyball",
    "dumbbell",
    "bicycle",

    "drum",
    "guitar",
    "music",
    "palette",
    "museum",
    "ticket",
    "film",
    "masks-theater",
    "puzzle-piece",
    "dice",
    "gamepad",
    "camera",
    "newspaper",

    "plane",
    "hotel",
    // faAirbnb,
    "passport",
    "suitcase-rolling",
    "map-location-dot",
    "landmark",
    "mountain-sun",
    "umbrella-beach",
    "sun",
    "cloud",
    "campground",

    "pills",
    "stethoscope",
    "suitcase-medical",
    "eye",
    "tooth",
    "heart",
    "heart-pulse",
    "hospital",

    "shield",
    "shield-halved",
    "shield-heart",
    "lock",
    "house-circle-check",

    "money-bill",
    "money-bill-1",
    "money-bills",
    "money-bill-wave",
    "money-bill-transfer",
    "circle-dollar-to-slot",
    "wallet",
    "credit-card",
    "plus",
    "sack-dollar",
    "piggy-bank",
    "arrow-trend-up",
    "money-bill-trend-up",
    "bitcoin-sign",
    "building",
    "landmark-flag",
    "person-cane",

    "pen-to-square",
    "pen",
    "paperclip",
    "ruler",
    "calculator",
    "book",
    "briefcase",
    "house-laptop",
    "school",
    "graduation-cap",
    "user-tie",
    "chalkboard-user",
    "chalkboard-teacher",
    "users-rectangle",
    "users",
    "certificate",
    "award",
    "trophy",

    "gifts",
    "gift",
    "cake-candles",
    "hand-holding-heart",
    "envelope",
    "champagne-glasses",
    "snowman",
    "church",
    "cross",

    "baby",
    "baby-carriage",
    "person-breastfeeding",
    "child",

    "paw",
    "dog",
    "cat",
    "fish",

    "trowel",
    "person-digging",
    "seedling",
    "leaf",
    "tree",
    "recycle",
    "truck",
    "tractor",

    "rectangle-ad",
    "database",
    "server",
    "smoking",
  ];

  const [selectedIndex, setSelectedIndex] = useState(
    icons.findIndex((val) => val === props.chosenIcon)
  );

  return (
    <div className={styles["icon-options"]}>
      {icons.map((icon, index) => (
        <FontAwesomeIcon
          key={index}
          icon={icon as IconProp}
          title={icon}
          className={`${styles["icon"]} ${styles["icon--large"]} ${
            selectedIndex === index ? styles["selected"] : ""
          }`}
          onClick={(e) => {
            setSelectedIndex(index);
            props.onClick(icon);
          }}
        />
      ))}
    </div>
  );
};

export default AvailableIcons;
