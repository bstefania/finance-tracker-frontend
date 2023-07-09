import React from "react";
import "../styles/UpcomingPayments.scss";
import { TransactionType } from "../types/database";

type UpcomingTransactionsProps = {
  type?: TransactionType;
};

function UpcomingTransactions({ type }: UpcomingTransactionsProps) {
  return (
    <div className="upcomingPayments">
      <div className="header">
        <h2>Upcoming transactions</h2>
      </div>
    </div>
  );
}

export default UpcomingTransactions;
