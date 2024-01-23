import { Dispatch, SetStateAction, useState } from "react";
import { TransactionSource } from "../../types/database";
import Dropdown from "./Dropdown";
import styles from "../../styles/organisms/TransactionDetails.module.scss"
import Icon from "../atoms/Icon";

type ExpenseTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>
}

function ExpenseTransaction({setSource}: ExpenseTransactionProps) {
  const sources = [
    { label: "Wallet", value: TransactionSource.Income },
    { label: "Savings", value: TransactionSource.Savings },
  ];

  return (
    <div className={styles["modal-field"]}>
      <Icon icon="arrow-up-from-bracket" />
      <Dropdown
        isSearchable
        placeholder="Select Source"
        options={sources}
        groups={false}
        onChange={(option: any) => {
          setSource(option.value);
        }}
      />
    </div>
  );
}

export default ExpenseTransaction;
