import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/atoms/Category.scss";

type CategoryProps = {
  category: string;
  color: string;
  categoryGroup: string;
};

const Category = (props: CategoryProps) => {
  return (
    <div className="category">
      <div className="icon-parent circle" style={{ backgroundColor: props.color }}>
        <div className="icon-background circle">
          <FontAwesomeIcon icon={faMoneyBill} className="icon" />
        </div>
      </div>
      <div className="details">
        <span className="category-title">{props.categoryGroup}</span>
        <span>{props.category}</span>
      </div>
    </div>
  );
};

export default Category;
