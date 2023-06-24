import React from "react";
import { faTable, faLineChart } from "@fortawesome/free-solid-svg-icons";
import { HeaderLink } from "./HeaderLink";
import Logo from "../../images/logo.png";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.header}>
        <img src={Logo} alt="logo" className={styles.logo} />
        <div className={styles.linksContainer}>
          <HeaderLink to="/" label="Таблица" icon={faTable} />
          <HeaderLink to="/chart" label="График" icon={faLineChart} />
        </div>
      </div>
    </header>
  );
};
