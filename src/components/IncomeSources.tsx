import React, { useEffect, useState } from "react"
import "../styles/IncomeSources.css"
import "../styles/Table.css"
import Category from "./Category"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons"
import TransactionDetails from "./TransactionDetails"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { IncomeSource, TransactionType } from "../types/database"

type IncomeSourcesProps = {
  type?: TransactionType
}

function IncomeSources({}: IncomeSourcesProps) {
  const [incomeSourcesDetailsVisible, setTransactionDetailsVisible] =
    useState(false)
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([])
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    getIncomeSources()
  }, [])

  const getIncomeSources = () => {
    return []
  }

  const toggleModal = (listChanged?: boolean) => {
    setTransactionDetailsVisible(!incomeSourcesDetailsVisible)
    if (listChanged) {
      getIncomeSources()
    }
  }

  return (
    <div className="table-div">
      <div className="header">
        <h1>Income Sources</h1>
        <button onClick={() => toggleModal()}>+ Add</button>
      </div>
      {incomeSourcesDetailsVisible && (
        <TransactionDetails toggleModal={toggleModal} />
      )}
      <div className="fixTableHead">
        <table className='income-sources-table'>
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Recurring</th>
              <th>Pay day</th>
              <th>Shared With</th>
            </tr>
          </thead>
          <tbody>
            {incomeSources.map((val, index) => {
              return (
                <tr key={val.id}>
                  <td>
                    <Category
                      category={val.category.name}
                      categoryGroup={val.category.categoryGroup.name}
                    />
                  </td>
                  <td>{val.name}</td>
                  <td className="income">{val.amount} EUR</td>
                  <td>{val.type}</td>
                  <td>{val.recurrence}</td>
                  <td>10th of each month</td>
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
      {incomeSources.length === 0 && (
        <div className="notFound">No recurrent income sources found</div>
      )}
    </div>
  )
}

export default IncomeSources