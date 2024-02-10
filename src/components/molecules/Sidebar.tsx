import { useState } from "react";
import Logo from "../atoms/Logo";
import { Link } from "react-router-dom";
import styles from "../../styles/molecules/Sidebar.module.scss";
import Icon, { IconType } from "../atoms/Icon";

function Sidebar() {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [showTitle, setShowTitles] = useState(false);

  const links = [
    {
      icon: "house",
      title: "Home",
      link: "/",
    },
    // {
    //   icon: "wallet",
    //   title: "Wallet",
    //   link: "/wallet",
    // },
    // {
    //   icon: "credit-card",
    //   title: "Spendings",
    //   link: "/spendings",
    // },
    // {
    //   icon: "piggy-bank",
    //   title: "Savings",
    //   link: "/savings",
    // },
    // {
    //   icon: "money-bill-trend-up",
    //   title: "Investments",
    //   link: "/investments",
    // },
    // {
    //   icon: "user-group",
    //   title: "Friends",
    //   link: "/friends",
    // },
    {
      icon: "gears",
      title: "Settings",
      link: "/settings",
    },
    // {
    //   icon: "calendar-days",
    //   title: "Calendar",
    //   link: "/calendar",
    // },
  ];
  const toggleSideNav = () => {
    setSidenavOpen(!sidenavOpen);
    setTimeout(() => {
      setShowTitles(!showTitle);
    }, 100);
  };

  return (
    <div
      className={`${styles["sidebar"]} ${
        sidenavOpen ? styles["sidebar--open"] : ""
      }`}
    >
      <div className={styles["header"]}>
        <div className={styles["logo-and-button"]}>
          <Logo showName={showTitle} />
          <div className={styles["open-button"]} onClick={toggleSideNav}>
            <Icon icon={sidenavOpen ? "angle-left" : "angle-right"} />
          </div>
        </div>
        <hr />
      </div>
      <div className={styles["content"]}>
        <ul className={styles["pages"]}>
          {links.map((link) => {
            return (
              <li key={link.title}>
                <Link to={link.link} className={styles["menu-link"]}>
                  <Icon icon={link.icon as IconType} large />
                  {showTitle && <p>{link.title}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
        {/* <div className={styles["page-ref"]}>
          <Icon icon="circle-user" large />
          {showTitle && <p>Account</p>}
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
