import React, { useEffect, useState } from "react"
import "../styles/Transactions.scss"
import "../styles/Table.scss"
import Category from "./Category"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons"
import TransactionDetails from "./TransactionDetails"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Transaction, TransactionType } from "../types/database"
import { euro } from "../utils/numberFormat"

type TransactionsProps = {
  type?: TransactionType
}

function Transactions({type}: TransactionsProps) {
  const [transactionDetailsVisible, setTransactionDetailsVisible] =
    useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    getTransactions()
  }, [])

  const getTransactions = () => {
    axiosPrivate
      .get("/transactions")
      .then((res: any) => {
        if (res.data.data) {
          setTransactions(res.data.data)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const toggleModal = (listChanged?: boolean) => {
    setTransactionDetailsVisible(!transactionDetailsVisible)
    if (listChanged) {
      getTransactions()
    }
  }

  return (
    <div className="table-div">
      <div className="header">
        <h2>Recent transactions</h2>
        <button onClick={() => toggleModal()}>+ Add</button>
      </div>
      {transactionDetailsVisible && <TransactionDetails
        toggleModal={toggleModal}
      /> }
      <div className="fixTableHead">
        <table className='transactions-table'>
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
                  <td className={val.type.toLowerCase()}>{euro.format(val.amount)}</td>
                  <td><span className={`label-${val.type}`}>{val.type.charAt(0).toUpperCase() + val.type.slice(1)}</span></td>
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
              )
            })}
          </tbody>
        </table>
      </div>
      {transactions.length === 0 && (
        <div className="notFound">No transactions found</div>
      )}
    </div>
  )
}

export default Transactions
