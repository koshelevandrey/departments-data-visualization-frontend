import React from "react";
import {
  DataEditor,
  GridCell,
  GridCellKind,
  GridColumn,
  Item,
  Theme,
} from "@glideapps/glide-data-grid";
import styles from "./DataGrid.module.css";
import { DepartmentDataItem } from "../../types/data";

interface DataGridProps {
  items: DepartmentDataItem[];
  gridColumns: GridColumn[];
  height: string | number | undefined;
}

export const DataGrid: React.FC<DataGridProps> = ({
  items,
  gridColumns,
  height,
}) => {
  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [columnIndex, rowIndex] = cell;
      const item = items[rowIndex] || {};
      const columnName = gridColumns[columnIndex].id! || "";
      const itemColumnValue =
        (item as unknown as Record<string, string>)[columnName] || "";
      return {
        style: "normal",
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: itemColumnValue,
        data: itemColumnValue,
      };
    },
    [items, gridColumns]
  );

  const getRowThemeOverride = React.useCallback(
    (row: number): Partial<Theme> | undefined => {
      if (row % 2 === 0) {
        return {
          bgCell: "#F9FDFF",
        };
      }
      return undefined;
    },
    []
  );

  return (
    <DataEditor
      getCellContent={getContent}
      columns={gridColumns}
      rows={items.length}
      height={height}
      width="100%"
      smoothScrollX={true}
      smoothScrollY={true}
      verticalBorder={true}
      rowMarkers="none"
      getRowThemeOverride={getRowThemeOverride}
      className={styles.dataGrid}
    />
  );
};
