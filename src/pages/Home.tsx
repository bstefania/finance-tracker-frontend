import { useNavigate, useLocation, Link } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/Pages.css"
import Transactions from '../components/Transactions'
import MoneyCard from '../components/MoneyCard'
import { faMoneyBillTransfer, faMoneyBillTrendUp, faPiggyBank, faWallet } from '@fortawesome/free-solid-svg-icons'
import "../styles/MoneyCard.css"
import MonthlyTransactions from '../components/MonthlyTransactions'
import UpcomingTransactions from '../components/UpcomingTransactions'

const Home = () => {
  // const navigate = useNavigate();
  // const location = useLocation()
  const axiosPrivate = useAxiosPrivate()

  const pingBackend = async () => {
    try {
      const res = await axiosPrivate.get("/")
      console.log(res)
    } catch (err) {
      console.log(err)
      // navigate("/login", {state: {from: location}, replace: true})
    }
  }

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
                <MoneyCard title="In wallet" percentage="15%" amount="15.000" icon={faWallet}/>
              </li>
              <li>
                <MoneyCard title="Saved" percentage="35%" amount="35.000" icon={faPiggyBank}/>
              </li>
              <li>
                <MoneyCard title="Invested" percentage="50%" amount="50.000" icon={faMoneyBillTrendUp}/>
              </li>
              <li>
                <MoneyCard title="Credit" percentage="0%" amount="0" icon={faMoneyBillTransfer}/>
              </li>
            </ul>
            <Transactions/>
          </main>
          <div className="rightSidebar">
            <MonthlyTransactions/>
            <UpcomingTransactions/>
          </div>
          </section>
          <section className="plans"></section>
        </article>
      </div>
    </div>
  )
}

export default Home
