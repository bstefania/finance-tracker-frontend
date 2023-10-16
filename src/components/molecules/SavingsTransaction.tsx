import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { TransactionSource } from "../../types/database";
import Dropdown from "../atoms/Dropdown";
import "../../styles/organisms/TransactionDetails.scss";
import "../../styles/common.scss";

type SavingsTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>;
};

function SavingsTransaction(props: SavingsTransactionProps) {
  const [sources, setSources] = useState([
    { label: "Wallet", value: TransactionSource.Income },
  ]);

  return (
    <div className="modal-field">
      <FontAwesomeIcon icon={faArrowUpFromBracket} className="icon" />
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
