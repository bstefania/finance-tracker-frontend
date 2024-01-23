import { TransactionType } from "../../types/database";
import styles from "../../styles/organisms/UpcomingPayments.module.scss";

type UpcomingTransactionsProps = {
  type?: TransactionType;
};

function UpcomingTransactions({ type }: UpcomingTransactionsProps) {
  return (
    <div className={styles["upcoming-payments"]}>
      <div className={styles["header"]}>
        <h2>Upcoming transactions</h2>
      </div>
      <div className={styles["not-found"]}>
        <span>Nothing found in the next 30 days.</span>
      </div>
    </div>
  );
}

export default UpcomingTransactions;
