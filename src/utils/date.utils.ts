import { ChartValue } from "../types/chart";

export function parseDepartmentDataItemDate(date: string): Date {
  return new Date(
    `${date.substring(0, 4)}-${date.substring(4, 6)}-${date.substring(6)}`
  );
}

export function parseDepartmentDataItemYear(date: Date): string {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
  });
}

export function getDateMonthName(date: Date): string {
  const monthName = date.toLocaleDateString(undefined, {
    month: "long",
  });

  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

export function parseChartValueDate(chartValue: ChartValue): Date {
  const [monthName, year] = chartValue.label.split(" ");
  const monthNumber = getMonthNumber(monthName);
  return new Date(`${monthNumber}/01/${year}`);
}

const monthNameToNumber: Record<string, number> = {
  январь: 1,
  февраль: 2,
  март: 3,
  апрель: 4,
  май: 5,
  июнь: 6,
  июль: 7,
  август: 8,
  сентябрь: 9,
  октябрь: 10,
  ноябрь: 11,
  декабрь: 12,
};

export function getMonthNumber(monthName: string): number {
  const formattedMonthName = monthName.toLowerCase();
  return monthNameToNumber[formattedMonthName] || 0;
}
