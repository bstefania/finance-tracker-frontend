import { useEffect, useState } from "react";
import Category from "../molecules/Category";
import TransactionDetails from "./TransactionDetails";
import { IncomeSource, TransactionType } from "../../types/database";
import Button from "../atoms/Button";
import styles from "../../styles/organisms/IncomeSources.module.scss";
import NoData from "../atoms/NoData";

type IncomeSourcesProps = {
  type?: TransactionType;
};

function IncomeSources({}: IncomeSourcesProps) {
  const [incomeSourcesDetailsVisible, setTransactionDetailsVisible] =
    useState(false);
  const incomeSources: IncomeSource[] = [];

  useEffect(() => {
    getIncomeSources();
  }, []);

  const getIncomeSources = () => {
    return [];
  };

  const toggleModal = (listChanged?: boolean) => {
    setTransactionDetailsVisible(!incomeSourcesDetailsVisible);
    if (listChanged) {
      getIncomeSources();
    }
  };

  return (
    <div className={styles["table-div"]}>
      <div className={styles["header"]}>
        <h2>Income Sources</h2>
        <Button onClick={() => toggleModal()}>+ Add</Button>
      </div>
      {incomeSourcesDetailsVisible && (
        <TransactionDetails toggleModal={toggleModal} />
      )}
      <div className={`${styles["fix-table-head"]} no-scrollbar`}>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {incomeSources.length === 0 && (
        <NoData
          isLoading={false}
          loadingText="Fetching transactions..."
          notFoundText="No recurrent income sources found"
        />
      )}
    </div>
  );
}

export default IncomeSources;
