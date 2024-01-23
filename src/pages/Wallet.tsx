import Transactions from "../components/organisms/Transactions";
import MoneyCard from "../components/molecules/MoneyCard";
import MonthlyTransactions from "../components/molecules/MonthlyTransactions";
import UpcomingTransactions from "../components/organisms/UpcomingTransactions";
import { MoneyCardType, TransactionType } from "../types/database";
import IncomeSources from "../components/organisms/IncomeSources";
import TransactionsLayout from "../components/layouts/TransactionsLayout";
import styles from "../styles/pages/Wallet.module.scss";

const Balance = () => {
  return (
    <TransactionsLayout header="Wallet">
      <section className={styles["main-section"]}>
        <main>
          <Transactions type={TransactionType.Income} />
          <IncomeSources />
        </main>
        <div className={styles["right-sidebar"]}>
          <MoneyCard type={MoneyCardType.Income} />
          <MonthlyTransactions type={TransactionType.Expense} />
          <UpcomingTransactions type={TransactionType.Expense} />
        </div>
      </section>
    </TransactionsLayout>
  );
};

export default Balance;
