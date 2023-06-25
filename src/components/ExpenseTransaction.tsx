import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, SetStateAction, useState } from "react";
import { TransactionSource } from "../types/database";
import Dropdown from "./Dropdown";

type ExpenseTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>
}

function ExpenseTransaction({setSource}: ExpenseTransactionProps) {
  const [sources, setSources] = useState([
    { label: "Wallet", value: TransactionSource.Income },
    { label: "Savings", value: TransactionSource.Savings },
  ]);

  return (
    <div className="modalField">
      <FontAwesomeIcon icon={faArrowUpFromBracket} className="icon" />
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
