import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Pages.scss"
import Transactions from "../components/Transactions"
import MoneyCard from "../components/MoneyCard"
import "../styles/MoneyCard.scss"
import MonthlyTransactions from "../components/MonthlyTransactions"
import UpcomingTransactions from "../components/UpcomingTransactions"
import { MoneyCardType, TransactionType } from "../types/database"
import IncomeSources from "../components/IncomeSources"

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
