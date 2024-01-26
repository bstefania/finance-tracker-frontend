import TransactionsLayout from "../components/layouts/TransactionsLayout";
import Transactions from "../components/organisms/Transactions";
import MoneyCard from "../components/molecules/MoneyCard";
import MonthlyTransactions from "../components/molecules/MonthlyTransactions";
import UpcomingTransactions from "../components/organisms/UpcomingTransactions";
import { MoneyCardType, TransactionType } from "../types/database";
import { ron } from "../utils/numberFormat";
import styles from "../styles/pages/Home.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { userActions } from "../store/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const wealth = useAppSelector((state) => state.user.wealth);

  useEffect(() => {
    dispatch(userActions.fetchWealth());
  }, [dispatch]);

  return (
    <TransactionsLayout header="Home">
      <section className={styles["main-section"]}>
        <main>
          <Transactions />
        </main>
        <div className={styles["right-sidebar"]}>
          <div className={styles["wealth"]}>
            <div className={styles["header"]}>
              <h2>Total Balance</h2>
              <span>{ron.format(wealth?.total ?? 0)}</span>
            </div>
            <ul>
              <li>
                <MoneyCard type={MoneyCardType.Income} />
              </li>
              <li>
                <MoneyCard type={MoneyCardType.Savings} />
              </li>
              <li>
                <MoneyCard type={MoneyCardType.Investments} />
              </li>
            </ul>
          </div>
          <MonthlyTransactions type={TransactionType.Expense} />
          <UpcomingTransactions />
        </div>
      </section>
      <section className={styles["plans"]}></section>
    </TransactionsLayout>
  );
};

export default Home;
