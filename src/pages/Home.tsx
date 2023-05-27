import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Pages.css";
import Transactions from "../components/Transactions";
import MoneyCard from "../components/MoneyCard";
import {
  faMoneyBillTrendUp,
  faPiggyBank,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/MoneyCard.css";
import MonthlyTransactions from "../components/MonthlyTransactions";
import UpcomingTransactions from "../components/UpcomingTransactions";
import { TransactionType } from "../types/database";
import useWealth from "../hooks/useWealth";

const Home = () => {
  const { wealth } = useWealth()

  return (
    <div className="page">
      <Sidebar />
      <div className="page-content">
        <Navbar header="Home" />
        <article>
          <section className="mainSection">
            <main>
              <ul>
                <li>
                  <MoneyCard
                    type={TransactionType.Income}
                    percentage={wealth?.category.wallet.percentage}
                    amount={wealth?.category.wallet.value}
                    icon={faWallet}
                  />
                </li>
                <li>
                  <MoneyCard
                    type={TransactionType.Savings}
                    percentage={wealth?.category.savings.percentage}
                    amount={wealth?.category.savings.value}
                    icon={faPiggyBank}
                  />
                </li>
                <li>
                  <MoneyCard
                    type={TransactionType.Investments}
                    percentage={wealth?.category.investments.percentage}
                    amount={wealth?.category.investments.value}
                    icon={faMoneyBillTrendUp}
                  />
                </li>
              </ul>
              <Transactions />
            </main>
            <div className="rightSidebar">
              <MonthlyTransactions />
              <UpcomingTransactions />
            </div>
          </section>
          <section className="plans"></section>
        </article>
      </div>
    </div>
  );
};

export default Home;
