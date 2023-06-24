import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import styles from "./HeaderLink.module.css";
import { IconDefinition } from "@fortawesome/free-regular-svg-icons";

interface HeaderLinkProps {
  to: string;
  label: string;
  icon: IconDefinition;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ to, label, icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(styles.headerLink, isActive && styles.activeHeaderLink)
      }
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      {label}
    </NavLink>
  );
};
