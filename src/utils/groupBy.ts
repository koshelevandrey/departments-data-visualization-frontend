// Returns array of elements grouped by key
import { ChartValue } from "../types/chart";
import { DepartmentDataItem } from "../types/data";

export function groupBy<K, V>(
  list: Array<V>,
  itemToKey: (input: V) => K,
  itemToValue: (input: V) => number,
  keyToValue: (key: K) => any,
  valueFieldName: string
): Array<V> {
  const map = new Map<K, number>();

  list.forEach((item) => {
    const key = itemToKey(item);
    const accumulatedValue = map.get(key) || 0;
    map.set(key, accumulatedValue + itemToValue(item));
  });

  return Array.from(map).map(([key, value]) => {
    return {
      ...keyToValue(key),
      [valueFieldName]: value.toString(),
    };
  });
}

const JOINED_COLUMNS_VALUES_SEPARATOR = "$";

export function groupDepartmentDataValues(
  departmentsData: DepartmentDataItem[],
  valueColumnName: string,
  activeColumnsMap: Map<string, boolean>
): DepartmentDataItem[] {
  const getItemKey = (item: DepartmentDataItem) => {
    let activeColumnsValues: string[] = [];

    activeColumnsMap.forEach((value, key) => {
      if (key !== valueColumnName) {
        activeColumnsValues.push(
          (item as unknown as Record<string, string>)[key]
        );
      }
    });

    return activeColumnsValues.join(JOINED_COLUMNS_VALUES_SEPARATOR);
  };

  const getItemValue = (item: DepartmentDataItem) => Number(item.workHours);

  const getItemByKey = (key: string) => {
    const columnValues = key.split(JOINED_COLUMNS_VALUES_SEPARATOR);
    const item: Record<string, string> = {};
    let i = 0;
    activeColumnsMap.forEach((value, key) => {
      item[key] = columnValues[i];
      i++;
    });
    return item;
  };

  return groupBy<string, DepartmentDataItem>(
    departmentsData,
    getItemKey,
    getItemValue,
    getItemByKey,
    valueColumnName
  );
}

export function groupChartValues(chartValues: ChartValue[]): ChartValue[] {
  const getChartValueKey = (item: ChartValue) => item.label;
  const getItemValue = (item: ChartValue) => Number(item.value);
  const getChartValueByKey = (key: string) => ({
    label: key,
  });
  const valueColumnName = "value";

  return groupBy<string, ChartValue>(
    chartValues,
    getChartValueKey,
    getItemValue,
    getChartValueByKey,
    valueColumnName
  );
}
