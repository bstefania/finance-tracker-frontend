import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Pages.scss"
import Transactions from "../components/Transactions"
import moneyCard from "../components/moneyCard"
import { faWallet } from "@fortawesome/free-solid-svg-icons"
import "../styles/moneyCard.scss"
import MonthlyTransactions from "../components/MonthlyTransactions"
import UpcomingTransactions from "../components/UpcomingTransactions"
import { moneyCardType, TransactionType } from "../types/database"
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
              <moneyCard
                type={moneyCardType.Income}
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
