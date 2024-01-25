import { Dispatch, SetStateAction } from "react";
import { TransactionSource } from "../../types/database";
import Input from "./Input";

type ExpenseTransactionProps = {
  setSource: Dispatch<SetStateAction<TransactionSource>>;
};

function ExpenseTransaction({ setSource }: ExpenseTransactionProps) {
  const sources = [
    { label: "Wallet", value: TransactionSource.Income },
    { label: "Savings", value: TransactionSource.Savings },
  ];

  return (
    <Input
      icon="arrow-up-from-bracket"
      isDropdown
      isSearchable
      placeholder="Select Source"
      options={sources}
      groups={false}
      onChange={(option: any) => {
        setSource(option.value);
      }}
    />
  );
}

export default ExpenseTransaction;
