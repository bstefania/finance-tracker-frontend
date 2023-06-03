import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Pages.css";
import Transactions from "../components/Transactions";
import MoneyCard from "../components/MoneyCard";
import "../styles/MoneyCard.css";
import MonthlyTransactions from "../components/MonthlyTransactions";
import UpcomingTransactions from "../components/UpcomingTransactions";
import { MoneyCardType, TransactionType } from "../types/database";
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
                    type={MoneyCardType.Income}
                  />
                </li>
                <li>
                  <MoneyCard
                    type={MoneyCardType.Savings}
                  />
                </li>
                <li>
                  <MoneyCard
                    type={MoneyCardType.Investments}
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
