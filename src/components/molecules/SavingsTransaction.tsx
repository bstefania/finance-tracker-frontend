import { Dispatch, SetStateAction, useState } from "react";
import { TransactionSource } from "../../types/database";
import Dropdown from "./Dropdown";
import styles from "../../styles/organisms/TransactionDetails.module.scss";
import Icon from "../atoms/Icon";

type SavingsTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>;
};

function SavingsTransaction(props: SavingsTransactionProps) {
  const sources = [
    { label: "Wallet", value: TransactionSource.Income },
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
          props.setSource(option);
        }}
      />
    </div>
  );
}

export default SavingsTransaction;
