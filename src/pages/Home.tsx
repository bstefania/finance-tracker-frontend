import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import "../styles/pages/Pages.scss";
import "../styles/pages/Home.scss";
import Transactions from "../components/organisms/Transactions";
import MoneyCard from "../components/molecules/MoneyCard";
import MonthlyTransactions from "../components/molecules/MonthlyTransactions";
import UpcomingTransactions from "../components/organisms/UpcomingTransactions";
import { MoneyCardType, TransactionType } from "../types/database";
import useWealth from "../hooks/useWealth";
import { ron } from "../utils/numberFormat";

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
