import styles from "../../styles/atoms/TransactionTypes.module.scss";
import { TRANSACTION_TYPES, TransactionType } from "../../types/database";

type TransactionTypesProps = {
  selectedType: TransactionType;
  // TODO: set type
  setSelectedType: any;
};

const TransactionTypes = ({
  selectedType,
  setSelectedType,
}: TransactionTypesProps) => {
  return (
    <div className={styles["type"]}>
      {TRANSACTION_TYPES.map((transactionType) => (
        <span
          key={transactionType}
          className={selectedType === transactionType ? styles["selected"] : ""}
          onClick={() => setSelectedType(transactionType)}
        >
          {transactionType}
        </span>
      ))}
    </div>
  );
};

export default TransactionTypes;
