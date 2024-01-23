import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { TransactionSource } from "../../types/database";
import Dropdown from "../atoms/Dropdown";
import styles from "../../styles/organisms/TransactionDetails.module.scss";

type SavingsTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>;
};

function SavingsTransaction(props: SavingsTransactionProps) {
  const [sources, setSources] = useState([
    { label: "Wallet", value: TransactionSource.Income },
  ]);

  return (
    <div className={styles["modal-field"]}>
      <FontAwesomeIcon icon={faArrowUpFromBracket} className={styles["icon"]} />
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
