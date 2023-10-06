import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Pages.scss";
import "../styles/Home.scss";
import Transactions from "../components/Transactions";
import MoneyCard from "../components/MoneyCard";
import "../styles/MoneyCard.scss";
import MonthlyTransactions from "../components/MonthlyTransactions";
import UpcomingTransactions from "../components/UpcomingTransactions";
import { MoneyCardType, TransactionType } from "../types/database";
import useWealth from "../hooks/useWealth";
import { euro } from "../utils/numberFormat";

const Home = () => {
  const { wealth } = useWealth();

  return (
    <div className="page">
      <Sidebar />
      <div className="page-content">
        <Navbar header="Home" />
        <article>
          <section className="main-section">
            <main>
              <Transactions />
            </main>
            <div className="right-sidebar">
            <div className="wealth">
                <div className="header">
                  <h2>Total Balance</h2>
                  <span>{euro.format(wealth?.total ?? 0)}</span>
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
              <MonthlyTransactions type={TransactionType.Expense}/>
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
