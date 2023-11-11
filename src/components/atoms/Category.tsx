import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import "../../styles/atoms/Category.scss";
import CircleIcon from "./CircleIcon";

type CategoryProps = {
  category: string;
  color: string;
  icon: string;
  categoryGroup: string;
};

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <CircleIcon color={props.color} icon={props.icon as any} />
      <div className="details">
        <span className="category-title">{props.categoryGroup}</span>
        <span>{props.category}</span>
      </div>
    </div>
  );
};

export default Category;
