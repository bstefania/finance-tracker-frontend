import { useEffect, useState } from "react";
import Category from "../atoms/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "./TransactionDetails";
import { Transaction, TransactionType } from "../../types/database";
import { ron } from "../../utils/numberFormat";
import { getTransactions } from "../../api/transactions";
import { Notification, showNotification } from "../../utils/errorHandling";
import "../../styles/organisms/Transactions.scss";
import "../../styles/utils/Table.scss";
import Actions from "../molecules/Actions";
import { Action } from "../../types/types";

type TransactionsProps = {
  type?: TransactionType;
};

function Transactions(props: TransactionsProps) {
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionToModify, setTransactionToModify] = useState<Transaction | null>(null);

  const actions: Action[] = [
    {
      label: "Edit",
      onClick: (transaction: Transaction) => {
        setTransactionToModify(transaction);
        setShowTransactionDetails(true);
      },
    },
    { label: "Delete", onClick: () => {} },
  ];
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    getTransactions()
      .then((data: Transaction[]) => {
        if (data) {
          setTransactions(data);
        }
      })
      .catch((error: any) => {
        showNotification(error.message, Notification.ERROR);
      });
  };

  const toggleModal = (listChanged?: boolean) => {
    setTransactionToModify(null)
    setShowTransactionDetails(!showTransactionDetails);
    if (listChanged) {
      fetchTransactions();
    }
  };

  return (
    <div className="table-div">
      <div className="header">
        <h2>Recent transactions</h2>
        <button onClick={() => toggleModal()}>+ Add</button>
      </div>
      {showTransactionDetails && (
        <TransactionDetails
          toggleModal={toggleModal}
          existingData={transactionToModify}
        />
      )}
      <div className="fix-table-head">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Date</th>
              <th>Shared With</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((val, index) => {
              return (
                <tr key={val.id}>
                  <td>
                    <Category
                      category={val.category.name}
                      categoryGroup={val.category.categoryGroup.name}
                      color={val.category.color}
                      icon={val.category.icon}
                    />
                  </td>
                  <td className={val.type.toLowerCase()}>
                    {ron.format(val.amount)}
                  </td>
                  <td>
                    <span className={`label-${val.type}`}>
                      {val.type.charAt(0).toUpperCase() + val.type.slice(1)}
                    </span>
                  </td>
                  <td>
                    {new Date(val.createdAt).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {val.sharedWith.length ? (
                      <div className="user-div">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className="column-with-action">
                    <Actions actions={actions} data={val} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <div className="not-found">No transactions found</div>
      )}
    </div>
  );
}

export default Transactions;
