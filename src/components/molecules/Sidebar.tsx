import { useState } from "react";
import Logo from "../atoms/Logo";
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styles from "../../styles/molecules/Sidebar.module.scss";

function Sidebar() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [showTitle, setShowTitles] = useState(false);

  const toggleSideNav = () => {
    setSidenavOpen(!sidenavOpen);
    setTimeout(() => {
      setShowTitles(!showTitle);
    }, 100);
  };

  return (
    <div className={`${styles["sidebar"]} ${sidenavOpen ? styles["sidebar--open"] : ""}`}>
      <div className={styles["header"]}>
        <div className={styles["logo-and-button"]}>
          <Logo showName={showTitle} />
          <div className={styles["open-button"]} onClick={toggleSideNav}>
            <FontAwesomeIcon
              icon={sidenavOpen ? faAngleLeft : faAngleRight}
              className={`${styles["icon"]} ${styles["icon--small"]}`}
            />
          </div>
        </div>
        <hr />
      </div>
      <div className={styles["content"]}>
        <ul className={styles["pages"]}>
          <li>
            <Link to="/" className={styles["menu-link"]}>
              <FontAwesomeIcon icon={faHouse} className={`${styles["icon"]} ${styles["icon--large"]}`} />
              {showTitle && <p>Home</p>}
            </Link>
          </li>
          <li>
            <Link to="/wallet" className={styles["menu-link"]}>
              <FontAwesomeIcon icon={faWallet} className={`${styles["icon"]} ${styles["icon--large"]}`} />
              {showTitle && <p>Wallet</p>}
            </Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faCreditCard} className={`${styles["icon"]} ${styles["icon--large"]}`} />
            {showTitle && <p>Spendings</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faPiggyBank} className={`${styles["icon"]} ${styles["icon--large"]}`} />
            {showTitle && <p>Savings</p>}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faMoneyBillTrendUp}
              className={`${styles["icon"]} ${styles["icon--large"]}`}
            />
            {showTitle && <p>Investments</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faUserGroup} className={`${styles["icon"]} ${styles["icon--large"]}`} />
            {showTitle && <p>Friends</p>}
          </li>
          <li>
            <FontAwesomeIcon icon={faGears} className={`${styles["icon"]} ${styles["icon--large"]}`} />
            {showTitle && <p>Settings</p>}
          </li>
          <li>
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={`${styles["icon"]} ${styles["icon--large"]}`}
            />
            {showTitle && <p>Calendar</p>}
          </li>
        </ul>
        <div className={styles["page-ref"]}>
          <FontAwesomeIcon icon={faCircleUser} className={`${styles["icon"]} ${styles["icon--large"]}`} />
          {showTitle && <p>Account</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
