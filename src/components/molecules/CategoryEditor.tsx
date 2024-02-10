import CircleIcon from "./CircleIcon";
import styles from "../../styles/molecules/CategoryEditor.module.scss";
import { Category } from "../../types/database";
import Icon from "../atoms/Icon";
import Label from "../atoms/Label";
import Button from "../atoms/Button";

type CategoryEditorProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  data: Category;
};

function CategoryEditor({ data, ...extraProps }: CategoryEditorProps) {
  return (
    <div className={styles["category"]} {...extraProps}>
      <div className={styles["details"]}>
        <CircleIcon color={data.color} icon={data.icon as any} />
        <div className={styles["text"]}>
          <span>{data.name}</span>
          <div>
            <Label transactionType="income">income</Label>
            <Label transactionType="expense">expense</Label>
            <Label transactionType="savings">savings</Label>
          </div>
        </div>
      </div>
      <div className={styles["right-side"]}>
      <Icon icon="circle-user" large title="Marcel Cristurean"/>
      <Button tertiary icon="ellipsis-vertical" />
      </div>
    </div>
  );
}

export default CategoryEditor;
