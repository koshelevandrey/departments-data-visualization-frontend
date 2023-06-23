import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Header } from "../Header/Header";

export const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.contentWrapper}>
        <Outlet />
      </main>
    </div>
  );
};
