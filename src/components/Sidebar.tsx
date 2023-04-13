import React, { useState } from "react"
import Logo from "./Logo"
import "../styles/Sidebar.css"
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
        <div className="logoAndButton">
          <Logo name={showTitle} />
          <div className="openButton" onClick={toggleSideNav}>
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
            <FontAwesomeIcon icon={faHouse} className="icon icon--large" />
            {showTitle && <p>Home</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faWallet} className="icon icon--large" />
            {showTitle && <p>Wallet</p>}
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
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className="icon icon--large" />
            {showTitle && <p className=''>Investments</p>}
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
            <FontAwesomeIcon icon={faCalendarDays} className="icon icon--large" />
            {showTitle && <p>Calendar</p>}
          </li>
        </ul>
        <div className="pageRef">
        <FontAwesomeIcon icon={faCircleUser} className="icon icon--large" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
