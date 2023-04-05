import React, { useState } from "react";
import Logo from "./Logo";
import "../styles/Sidebar.css";
import {
  faCalendarDays,
  faCircleUser,
  faCreditCard,
  faGears,
  faHouse,
  faMoneyBillTrendUp,
  faPiggyBank,
  faUserGroup,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar() {
  const [sidenavOpen, setSidenavOpen] = useState(false);

  const openNav = () => {
    setSidenavOpen(true);
  };

  const closeNav = () => {
    setSidenavOpen(false);
  };

  return (
    <div className="sidebar">
      <div className="header">
        <div className="logoAndButton">
          <Logo name={false} />
          <div className="openButton">
            <span>{">"}</span>
          </div>
        </div>
        <hr />
      </div>
      <div className="content">
        <div className="pages">
          <FontAwesomeIcon icon={faHouse} className="formIcon" />
          <FontAwesomeIcon icon={faWallet} className="formIcon" />
          <FontAwesomeIcon icon={faCreditCard} className="formIcon" />
          <FontAwesomeIcon icon={faPiggyBank} className="formIcon" />
          <FontAwesomeIcon icon={faMoneyBillTrendUp} className="formIcon" />
          <FontAwesomeIcon icon={faCalendarDays} className="formIcon" />
          <FontAwesomeIcon icon={faUserGroup} className="formIcon" />
          <FontAwesomeIcon icon={faGears} className="formIcon" />
        </div>
        <FontAwesomeIcon icon={faCircleUser} className="formIcon" />
      </div>
    </div>
  );
}

export default Sidebar;
