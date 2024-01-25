import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Category from "../molecules/Category";
import Actions from "../molecules/Actions";
import TransactionDetails from "./TransactionDetails";
import { Transaction, TransactionType } from "../../types/database";
import { Action } from "../../types/types";
import { ron } from "../../utils/numberFormat";
import { Notification, showNotification } from "../../utils/errorHandling";
import styles from "../../styles/organisms/Transactions.module.scss";
import NoData from "../atoms/NoData";
import { fetchTransactions } from "../../store/transactionsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

type TransactionsProps = {
  type?: TransactionType;
};

function Transactions(props: TransactionsProps) {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.entities);
  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);

  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [transactionToModify, setTransactionToModify] = useState<Transaction | null>(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      showNotification(error, Notification.ERROR);
    }
  }, [error]);

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

  const toggleModal = () => {
    setTransactionToModify(null);
    setShowTransactionDetails(oldValue => !oldValue);
  };

  return (
    <div className={styles["table-div"]}>
      <div className={styles["header"]}>
        <h2>Recent transactions</h2>
        <Button onClick={() => toggleModal()}>+ Add</Button>
      </div>
      {showTransactionDetails && (
        <TransactionDetails
          toggleModal={toggleModal}
          existingData={transactionToModify}
        />
      )}
      <div className={styles["fix-table-head"]}>
        <table className={styles["transactions-table"]}>
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
            {Object.entries(transactions).map(([key, val], index) => {
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
                  <td>{ron.format(val.amount)}</td>
                  <td>
                    <span className={styles[`label-${val.type}`]}>
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
                      <div className={styles["user-div"]}>
                        <Icon icon="user" className={styles["user-icon"]} />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={styles["column-with-action"]}>
                    <Actions actions={actions} data={val} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {Object.keys(transactions).length === 0 && (
        <NoData
          isLoading={status === "loading"}
          loadingText="Fetching transactions..."
          notFoundText="No transactions found"
        />
      )}
    </div>
  );
}

export default Transactions;
