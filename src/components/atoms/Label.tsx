import { TransactionType } from "../../types/database";
import styles from "../../styles/atoms/Label.module.scss";

type LabelProps = {
  transactionType: any;
  children: any;
};

function Label(props: LabelProps) {
  return <span className={`${styles["label"]} ${styles[`label-${props.transactionType}`]}`}>{props.children}</span>;
}

export default Label;
