import Navbar from "../components/molecules/Navbar"
import Sidebar from "../components/molecules/Sidebar"
import "../styles/pages/Pages.scss"
import Transactions from "../components/organisms/Transactions"
import MoneyCard from "../components/molecules/MoneyCard"
import MonthlyTransactions from "../components/molecules/MonthlyTransactions"
import UpcomingTransactions from "../components/organisms/UpcomingTransactions"
import { MoneyCardType, TransactionType } from "../types/database"
import IncomeSources from "../components/organisms/IncomeSources"

const Balance = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="page-content">
        <Navbar header="Wallet" />
        <article>
          <section className="main-section">
            <main>
              <Transactions type={TransactionType.Income} />
              <IncomeSources />
            </main>
            <div className="right-sidebar">
              <MoneyCard
                type={MoneyCardType.Income}
              />
              <MonthlyTransactions type={TransactionType.Expense} />
              <UpcomingTransactions type={TransactionType.Expense} />
            </div>
          </section>
        </article>
      </div>
    </div>
  )
}

export default Balance
