import { TransactionType } from "../../types/database";
import styles from "../../styles/organisms/UpcomingPayments.module.scss";
import NoData from "../atoms/NoData";

type UpcomingTransactionsProps = {
  type?: TransactionType;
};

function UpcomingTransactions({ type }: UpcomingTransactionsProps) {
  return (
    <div className={styles["upcoming-payments"]}>
      <div className={styles["header"]}>
        <h2>Upcoming transactions</h2>
      </div>
      <NoData
        isLoading={false}
        loadingText="Fetching transactions..."
        notFoundText="Nothing found in the next 30 days"
      />
    </div>
  );
}

export default UpcomingTransactions;
