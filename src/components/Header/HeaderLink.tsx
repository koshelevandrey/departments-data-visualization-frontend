import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import styles from "./HeaderLink.module.css";

interface HeaderLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(styles.headerLink, isActive && styles.activeHeaderLink)
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};
