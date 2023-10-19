import { useEffect, useState } from "react";
import Category from "../atoms/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "./TransactionDetails";
import { Transaction, TransactionType } from "../../types/database";
import { euro } from "../../utils/numberFormat";
import { getTransactions } from "../../api/transactions";
import { Notification, showNotification } from "../../utils/errorHandling";
import "../../styles/organisms/Transactions.scss";
import "../../styles/utils/Table.scss";

type TransactionsProps = {
  type?: TransactionType;
};

function Transactions(props: TransactionsProps) {
  const [transactionDetailsVisible, setTransactionDetailsVisible] =
    useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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
    setTransactionDetailsVisible(!transactionDetailsVisible);
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
      {transactionDetailsVisible && (
        <TransactionDetails toggleModal={toggleModal} />
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
                    />
                  </td>
                  <td className={val.type.toLowerCase()}>
                    {euro.format(val.amount)}
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
                    <div className="column-with-action">
                      {val.sharedWith.length ? (
                        <div className="user-div">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="user-icon"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="icon-action"
                      />
                    </div>
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
