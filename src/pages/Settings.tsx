import TransactionsLayout from "../components/layouts/TransactionsLayout";
import styles from "../styles/pages/Settings.module.scss";
import CategoryGroupSettings from "../components/organisms/CategoryGroupSettings";

const Settings = () => {
  return (
    <TransactionsLayout header="Settings">
      <section className={styles["main-section"]}>
        <main>
          <CategoryGroupSettings />
        </main>
        <div className={styles["right-sidebar"]}>
          </div>
        </section>
    </TransactionsLayout>
  );
};

export default Settings;
