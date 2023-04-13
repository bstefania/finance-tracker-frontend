import React, { useState } from "react"
import "../styles/Transactions.css"
import Category from "./Category"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons"
import TransactionDetails from './TransactionDetails'
type TransactionsProps = {
  type: string
}

const data = [
  {
    category: { mainCategory: "Food and Drinks", subCategory: "Groceries" },
    amount: 100,
    type: "Expense",
    date: "2023.02.21",
    sharedWith: [],
  },
  {
    category: { mainCategory: "Income", subCategory: "Salary" },
    amount: 2000,
    type: "Income",
    date: "2023.02.21",
    sharedWith: [],
  },
]

function Transactions(props: TransactionsProps) {
  const [transactionDetailsVisible, setTransactionDetailsVisible] = useState(false)
  
  const toggleModal = () => {
    setTransactionDetailsVisible(!transactionDetailsVisible)
  }

  return (
    <div className="transactions">
      <div className="header">
        <h1>Recent transactions</h1>
        <button onClick={toggleModal}>+ Add</button>
      </div>
      <TransactionDetails show={transactionDetailsVisible} toggleModal={toggleModal}/>
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
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>
                  <Category
                    category={val.category.mainCategory}
                    subCategory={val.category.subCategory}
                  />
                </td>
                <td className={val.type.toLowerCase()}>{val.amount} EUR</td>
                <td>{val.type}</td>
                <td>
                  {new Date(val.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <div className="columnWithAction">
                    <div className="userDiv">
                      <FontAwesomeIcon icon={faUser} className="userIcon" />
                    </div>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="iconAction"
                    />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
