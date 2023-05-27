import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Pages.css"
import Transactions from "../components/Transactions"
import MoneyCard from "../components/MoneyCard"
import { faWallet } from "@fortawesome/free-solid-svg-icons"
import "../styles/MoneyCard.css"
import MonthlyTransactions from "../components/MonthlyTransactions"
import UpcomingTransactions from "../components/UpcomingTransactions"
import { TransactionType } from "../types/database"
import IncomeSources from "../components/IncomeSources"

const Balance = () => {
  return (
    <div className="page">
      <Sidebar />
      <div className="page-content">
        <Navbar header="Wallet" />
        <article>
          <section className="mainSection">
            <main>
              <Transactions type={TransactionType.Income} />
              <IncomeSources />
            </main>
            <div className="rightSidebar">
              <MoneyCard
                type={TransactionType.Income}
                percentage={0}
                amount={0}
                icon={faWallet}
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
