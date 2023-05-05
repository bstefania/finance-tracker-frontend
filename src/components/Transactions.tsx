import React, { useEffect, useState } from "react";
import "../styles/Transactions.css";
import Category from "./Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "./TransactionDetails";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Transaction } from "../types/database";

type TransactionsProps = {
  type: string;
};

function Transactions(props: TransactionsProps) {
  const [transactionDetailsVisible, setTransactionDetailsVisible] =
    useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/transactions")
      .then((res: any) => {
        console.log(res.data);
        setTransactions(res.data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const toggleModal = () => {
    setTransactionDetailsVisible(!transactionDetailsVisible);
  };

  if (transactions.length === 0) return <h3>No transactions found</h3>;
  else
    return (
      <div className="transactions">
        <div className="header">
          <h1>Recent transactions</h1>
          <button onClick={toggleModal}>+ Add</button>
        </div>
        <TransactionDetails
          show={transactionDetailsVisible}
          toggleModal={toggleModal}
        />
        <table>
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
                    />
                  </td>
                  <td className={val.type.toLowerCase()}>{val.amount} EUR</td>
                  <td>{val.type}</td>
                  <td>
                    {new Date(val.createdAt).toLocaleDateString("en-us", {
                      weekday: "long",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <div className="columnWithAction">
                      {val.sharedWith.length ? (
                        <div className="userDiv">
                          <FontAwesomeIcon icon={faUser} className="userIcon" />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="iconAction"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
}

export default Transactions;
