import React from "react";
import "@glideapps/glide-data-grid/dist/index.css";
import { useTableDataContext } from "../../hooks/useTableDataContext";
import { MultiSelect } from "../../components/MultiSelect/MultiSelect";
import { DataGrid } from "../../components/DataGrid/DataGrid";
import styles from "./DepartmentsTable.module.css";
import { TableColumn } from "../../types/table";

export const DepartmentsTable: React.FC = () => {
  const {
    tableData,
    tableColumns,
    chosenGridColumns,
    selectColumn,
    deselectColumn,
  } = useTableDataContext();

  const onSelect = (value: TableColumn, option: TableColumn) => {
    selectColumn(option.id!);
  };

  const onDeselect = (value: TableColumn, option: TableColumn) => {
    deselectColumn(option.id!);
  };

  return (
    <div className={styles.departmentsTableContainer}>
      <MultiSelect
        columns={tableColumns}
        onSelect={onSelect}
        onDeselect={onDeselect}
        placeholder="Выберите колонки"
      />
      <DataGrid
        items={tableData}
        gridColumns={chosenGridColumns}
        height={600}
      />
    </div>
  );
};
