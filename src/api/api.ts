import {
  getDateMonthName,
  parseDepartmentDataItemDate,
} from "../utils/date.utils";
import { BackendDepartmentDataItem, DepartmentDataItem } from "../types/data";

const { REACT_APP_BACKEND_URL } = process.env;

const BACKEND_URL = REACT_APP_BACKEND_URL || "http://localhost:8000";

const toFormattedDepartmentDataItem = (
  item: BackendDepartmentDataItem
): DepartmentDataItem => {
  const itemDate = parseDepartmentDataItemDate(item.Дата);
  const monthName = getDateMonthName(itemDate);

  return {
    department: item.Департамент,
    division: item.Отдел,
    team: item.Команда,
    month: monthName,
    date: item.Дата,
    workHours: item["Кол-во отработанных часов"],
  };
};

export function getDepartmentsData(): Promise<DepartmentDataItem[]> {
  return fetch(`${BACKEND_URL}/data`)
    .then((response) => response.json())
    .then((jsonData: BackendDepartmentDataItem[]) =>
      jsonData.map(toFormattedDepartmentDataItem)
    );
}
