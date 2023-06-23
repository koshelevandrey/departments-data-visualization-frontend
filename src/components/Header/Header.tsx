import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          <HeaderLink
            to="/"
            label="Таблица"
            icon={<FontAwesomeIcon icon={faTable} color="#6b95fd" />}
          />
          <HeaderLink
            to="/chart"
            label="График"
            icon={<FontAwesomeIcon icon={faLineChart} color="#6b95fd" />}
          />
        </div>
      </div>
    </header>
  );
};
