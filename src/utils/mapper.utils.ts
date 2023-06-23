import {
  parseDepartmentDataItemDate,
  parseDepartmentDataItemYear,
} from "./date.utils";
import { DepartmentDataItem } from "../types/data";
import { TableColumn } from "../types/table";

export function departmentsDataToChartValues(
  departmentsData: DepartmentDataItem[]
) {
  return departmentsData.map((item) => {
    const itemDate = parseDepartmentDataItemDate(item.date);
    const year = parseDepartmentDataItemYear(itemDate);
    return { label: `${item.month} ${year}`, value: item.workHours };
  });
}

const GRID_COLUMNS_DEFAULT_WIDTHS: Record<string, number> = {
  department: 100,
  division: 100,
  team: 100,
  month: 100,
  date: 100,
  workHours: 200,
};

export function tableColumnsToGridColumns(tableColumns: TableColumn[]) {
  return tableColumns
    .filter((column) => column.isChosen)
    .map((column) => ({
      id: column.id as string,
      title: column.title as string,
      grow: 1,
      width: GRID_COLUMNS_DEFAULT_WIDTHS[column.id as string],
    }));
}
