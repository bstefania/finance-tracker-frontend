import React, { useState } from "react"
import Logo from "./Logo"
import "../styles/Sidebar.css"
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faCaretRight,
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
  const [sidenavOpen, setSidenavOpen] = useState(true)
  const [showTitle, setShowTitles] = useState(true)

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
              className="formIcon smallIcon"
            />
          </div>
        </div>
        <hr />
      </div>
      <div className="content">
        <div className="pages">
          <div className="pageRef">
            <FontAwesomeIcon icon={faHouse} className="formIcon" />
            {showTitle && <p>Home</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faWallet} className="formIcon" />
            {showTitle && <p>Wallet</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faCreditCard} className="formIcon" />
            {showTitle && <p>Spendings</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faPiggyBank} className="formIcon" />
            {showTitle && <p>Savings</p>}

          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faMoneyBillTrendUp} className="formIcon" />
            {showTitle && <p className=''>Investments</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faUserGroup} className="formIcon" />
            {showTitle && <p>Friends</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faGears} className="formIcon" />
            {showTitle && <p>Settings</p>}
          </div>
          <div className="pageRef">
            <FontAwesomeIcon icon={faCalendarDays} className="formIcon" />
            {showTitle && <p>Calendar</p>}
          </div>
        </div>
        <FontAwesomeIcon icon={faCircleUser} className="formIcon" />
      </div>
    </div>
  )
}

export default Sidebar
