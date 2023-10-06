import React, { useState } from "react"
import Logo from "./Logo"
import "../styles/Sidebar.scss"
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faCircleUser,
  faCreditCard,
  faGears,
  faHouse,
  faMoneyBillTrendUp,
  faPiggyBank,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'

function Sidebar() {
  const [sidenavOpen, setSidenavOpen] = useState(false)
  const [showTitle, setShowTitles] = useState(false)

  const toggleSideNav = () => {
    setSidenavOpen(!sidenavOpen)
    setTimeout(() => {
      setShowTitles(!showTitle)
    }, 100)
  }

  return (
    <div className={`sidebar ${sidenavOpen ? "sidebar--open" : ""}`}>
      <div className="header">
        <div className="logo-and-button">
          <Logo name={showTitle} />
          <div className="open-button" onClick={toggleSideNav}>
            <FontAwesomeIcon
              icon={sidenavOpen ? faAngleLeft : faAngleRight}
              className="icon icon--small"
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="content">
        <ul className="pages">
          <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHouse} className="icon icon--large" />
            {showTitle && <p>Home</p>}
            </Link>
          </li>
          <li>
            
            <Link to="/wallet">
            <FontAwesomeIcon icon={faWallet} className="icon icon--large" />
            {showTitle && <p>Wallet</p>}
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faCreditCard} className="icon icon--large" />
            {showTitle && <p>Spendings</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faPiggyBank} className="icon icon--large" />
            {showTitle && <p>Savings</p>}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faMoneyBillTrendUp}
              className="icon icon--large"
            />
            {showTitle && <p className="">Investments</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faUserGroup} className="icon icon--large" />
            {showTitle && <p>Friends</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faGears} className="icon icon--large" />
            {showTitle && <p>Settings</p>}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="icon icon--large"
            />
            {showTitle && <p>Calendar</p>}
          </li>
        </ul>
        <div className="page-ref">
          <FontAwesomeIcon icon={faCircleUser} className="icon icon--large" />
          {showTitle && <p>Account</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
