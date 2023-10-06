import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/Pages.scss";
import "../styles/Home.scss";
import Transactions from "../components/Transactions";
import moneyCard from "../components/moneyCard";
import "../styles/moneyCard.scss";
import MonthlyTransactions from "../components/MonthlyTransactions";
import UpcomingTransactions from "../components/UpcomingTransactions";
import { moneyCardType, TransactionType } from "../types/database";
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
          <section className="mainSection">
            <main>
              <Transactions />
            </main>
            <div className="rightSidebar">
            <div className="wealth">
                <div className="header">
                  <h2>Total Balance</h2>
                  <span>{euro.format(wealth?.total ?? 0)}</span>
                </div>
                <ul>
                  <li>
                    <moneyCard type={moneyCardType.Income} />
                  </li>
                  <li>
                    <moneyCard type={moneyCardType.Savings} />
                  </li>
                  <li>
                    <moneyCard type={moneyCardType.Investments} />
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
