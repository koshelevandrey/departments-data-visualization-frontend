import React from "react";
import { Select } from "antd";
import { TableColumn } from "../../types/table";
import styles from "./MultiSelect.module.css";

interface MultiSelectProps {
  columns: TableColumn[];
  onSelect: (value: TableColumn, option: TableColumn) => void;
  onDeselect: (value: TableColumn, option: TableColumn) => void;
  placeholder: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  columns,
  onSelect,
  onDeselect,
  placeholder,
}) => {
  return (
    <Select
      placement="topLeft"
      mode="multiple"
      className={styles.multiselect}
      popupClassName={styles.popup}
      placeholder={placeholder}
      defaultValue={columns.filter(
        (column) => column.isChosen && !column.hidden
      )}
      options={columns.filter((column) => !column.hidden)}
      onSelect={onSelect}
      onDeselect={onDeselect}
    />
  );
};
