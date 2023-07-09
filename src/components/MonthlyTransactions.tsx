import React from "react";
import "../styles/MonthlyExpenses.scss";
import { TransactionType } from "../types/database";

type MonthlyTransactionsProps = {
  type?: TransactionType;
};

function MonthlyTransactions({ type }: MonthlyTransactionsProps) {
  return (
    <div className="monthlyExpenses">
      <div className="header">
        <h2>Monthly transactions</h2>
      </div>
    </div>
  );
}

export default MonthlyTransactions;
