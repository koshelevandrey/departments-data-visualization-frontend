import { ChartValue } from "../types/chart";
import { getMonthNumber, parseChartValueDate } from "./date.utils";
import { DepartmentDataItem } from "../types/data";

function compareChartValues(value1: ChartValue, value2: ChartValue): number {
  const date1 = parseChartValueDate(value1);
  const date2 = parseChartValueDate(value2);
  return date1.getTime() - date2.getTime();
}

export function sortChartValues(chartValues: ChartValue[]): ChartValue[] {
  return chartValues.sort(compareChartValues);
}

export function sortDepartmentDataValues(
  departmentsData: DepartmentDataItem[],
  activeColumnsMap: Map<string, boolean>
): DepartmentDataItem[] {
  const compareDepartmentsDataItems = (
    item1: DepartmentDataItem,
    item2: DepartmentDataItem
  ) => {
    const compareDepartments = activeColumnsMap.get("department")
      ? item1.department.localeCompare(item2.department)
      : 0;
    const compareDivisions = activeColumnsMap.get("division")
      ? item1.division.localeCompare(item2.division)
      : 0;
    const compareTeams = activeColumnsMap.get("team")
      ? item1.team.localeCompare(item2.team)
      : 0;
    const compareMonths = activeColumnsMap.get("month")
      ? getMonthNumber(item1.month) - getMonthNumber(item2.month)
      : 0;
    const compareDates = activeColumnsMap.get("date")
      ? item1.date.localeCompare(item2.date)
      : 0;

    return (
      compareDepartments ||
      compareDivisions ||
      compareTeams ||
      compareMonths ||
      compareDates
    );
  };

  return departmentsData.sort(compareDepartmentsDataItems);
}
