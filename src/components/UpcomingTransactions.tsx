import React from "react";
import "../styles/UpcomingPayments.scss";
import { TransactionType } from "../types/database";

type UpcomingTransactionsProps = {
  type?: TransactionType;
};

function UpcomingTransactions({ type }: UpcomingTransactionsProps) {
  return (
    <div className="upcoming-payments">
      <div className="header">
        <h2>Upcoming transactions</h2>
      </div>
      <div className="not-found">
        <span>Nothing found in the next 30 days.</span>
      </div>
    </div>
  );
}

export default UpcomingTransactions;
