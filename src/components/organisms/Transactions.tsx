import { useEffect, useState } from "react";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Category from "../molecules/Category";
import Actions from "../molecules/Actions";
import TransactionDetails from "./TransactionDetails";
import { TransactionType } from "../../types/database";
import { Action } from "../../types/types";
import { ron } from "../../utils/dataFormatter";
import { Notification, showNotification } from "../../utils/errorHandling";
import styles from "../../styles/organisms/Transactions.module.scss";
import NoData from "../atoms/NoData";
import { transactionsActions } from "../../store/transactionsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import Label from "../atoms/Label";

type TransactionsProps = {
  type?: TransactionType;
};

function Transactions(props: TransactionsProps) {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.entities);
  const status = useAppSelector((state) => state.transactions.status);
  const error = useAppSelector((state) => state.transactions.error);

  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [transactionIdToModify, setTransactionIdToModify] = useState<string>();

  useEffect(() => {
    dispatch(transactionsActions.fetchTransactions());
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      showNotification(error, Notification.ERROR);
    }
  }, [error]);

  const actions: Action[] = [
    {
      label: "Edit",
      onClick: (transactionId: string) => {
        setTransactionIdToModify(transactionId);
        setShowTransactionDetails(true);
      },
    },
    { label: "Delete", onClick: (transactionId: string) => {
      dispatch(transactionsActions.deleteTransaction(transactionId))
    } },
  ];

  const toggleModal = () => {
    setTransactionIdToModify(undefined);
    setShowTransactionDetails(oldValue => !oldValue);
  };

  return (
    <div className={`${styles["widget"]} ${styles["table-div"]} ${styles["transactions"]}`}>
      <div className={styles["header"]}>
        <h2>Recent transactions</h2>
        <Button onClick={() => toggleModal()}>+ Add</Button>
      </div>
      {showTransactionDetails && (
        <TransactionDetails
          toggleModal={toggleModal}
          transactionIdToModify={transactionIdToModify}
        />
      )}
      <div className={`${styles["fix-table-head"]} no-scrollbar`}>
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
            {Object.entries(transactions).map(([transactionId, transaction], index) => {
              return (
                <tr key={transaction.id}>
                  <td>
                    <Category
                      category={transaction.category.name}
                      categoryGroup={transaction.category.categoryGroup.name}
                      color={transaction.category.color}
                      icon={transaction.category.icon}
                    />
                  </td>
                  <td>{ron.format(transaction.amount)}</td>
                  <td>
                    <Label transactionType={transaction.type}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </Label>
                  </td>
                  <td>
                    {new Date(transaction.createdAt).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {transaction.sharedWith.length ? (
                      <div className={styles["user-div"]}>
                        <Icon icon="user" className={styles["user-icon"]} />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={styles["column-with-action"]}>
                    <Actions actions={actions} data={transactionId} />
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
