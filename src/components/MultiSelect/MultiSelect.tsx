import React from "react";
import { Select } from "antd";
import { TableColumn } from "../../types/table";

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
      style={{ width: "100%", height: "100%" }}
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
