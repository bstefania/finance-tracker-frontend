import styles from "../../styles/atoms/Category.module.scss";
import CircleIcon from "./CircleIcon";

type CategoryProps = {
  category: string;
  color: string;
  icon: string;
  categoryGroup: string;
};

const Category = (props: CategoryProps) => {
  return (
    <div className={styles["category"]}>
      <CircleIcon color={props.color} icon={props.icon as any} />
      <div className={styles["details"]}>
        <span className={styles["category-title"]}>{props.categoryGroup}</span>
        <span>{props.category}</span>
      </div>
    </div>
  );
};

export default Category;
