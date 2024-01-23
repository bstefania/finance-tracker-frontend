import { useEffect, useState } from "react"
import Category from "../atoms/Category"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical, faUser } from "@fortawesome/free-solid-svg-icons"
import TransactionDetails from "./TransactionDetails"
import { IncomeSource, TransactionType } from "../../types/database"
import styles from "../../styles/organisms/IncomeSources.module.scss"

type IncomeSourcesProps = {
  type?: TransactionType
}

function IncomeSources({}: IncomeSourcesProps) {
  const [incomeSourcesDetailsVisible, setTransactionDetailsVisible] =
    useState(false)
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([])

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
    <div className={styles["table-div"]}>
      <div className={styles["header"]}>
        <h2>Income Sources</h2>
        <button onClick={() => toggleModal()}>+ Add</button>
      </div>
      {incomeSourcesDetailsVisible && (
        <TransactionDetails toggleModal={toggleModal} />
      )}
      <div className={styles["fix-table-head"]}>
        <table className={styles["income-sources-table"]}>
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
                      color={val.category.color}
                      icon={val.category.icon}
                      categoryGroup={val.category.categoryGroup.name}
                    />
                  </td>
                  <td>{val.name}</td>
                  <td className={styles["income"]}>{val.amount} EUR</td>
                  <td>{val.type}</td>
                  <td>{val.recurrence}</td>
                  <td>10th of each month</td>
                  <td>
                    <div className={styles["column-with-action"]}>
                      {val.sharedWith.length ? (
                        <div className={styles["user-div"]}>
                          <FontAwesomeIcon icon={faUser} className={styles["user-icon"]} />
                        </div>
                      ) : (
                        <div></div>
                      )}
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className={styles["icon-action"]}
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
        <div className={styles["not-found"]}>No recurrent income sources found</div>
      )}
    </div>
  )
}

export default IncomeSources
