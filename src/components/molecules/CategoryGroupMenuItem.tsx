import styles from "../../styles/molecules/CategoryGroupMenuItem.module.scss";
import Icon from "../atoms/Icon";
import CircleIcon from "./CircleIcon";
import { CategoryGroup } from "../../types/database";

type CategoryGroupProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  data: CategoryGroup;
  selected: boolean;
};

const CategoryGroupMenuItem = ({data, selected, ...extraProps}: CategoryGroupProps) => {

  return (
    <div className={`${styles["category-group"]} ${selected ? styles["selected"] : ""}`} {...extraProps}>
        <div className={styles["details"]}>
          <CircleIcon color={data.color} icon={data.icon as any} />
          <span>{data.name}</span>
        </div>
        <Icon icon="chevron-right" withAction className={styles["arrow"]}/>
    </div>
  );
};

export default CategoryGroupMenuItem;
