import Navbar from "../molecules/Navbar";
import Sidebar from "../molecules/Sidebar";
import styles from "../../styles/layouts/TransactionsLayout.module.scss";

type LayoutProps = {
  header: string;
  children?: React.ReactNode;
};

const TransactionsLayout: React.FC<LayoutProps> = ({ header, children }) => {
  return (
    <div className={styles["page"]}>
      <Sidebar />
      <div className={styles["page-content"]}>
        <Navbar header={header} />
        <article>{children}</article>
      </div>
    </div>
  );
};

export default TransactionsLayout;
