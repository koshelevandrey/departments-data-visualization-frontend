import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { GridColumn } from "@glideapps/glide-data-grid";
import { groupDepartmentDataValues } from "../utils/groupBy";
import { useDepartmentsDataContext } from "../hooks/useDepartmentsDataContext";
import { useIsFirstRender } from "../hooks/useIsFirstRender";
import { TableDataContextType } from "../types/contexts";
import { DepartmentDataItem } from "../types/data";
import { TableColumn } from "../types/table";
import { tableColumnsToGridColumns } from "../utils/mapper.utils";
import { sortDepartmentDataValues } from "../utils/sort.utils";

export const TableDataContext = createContext<TableDataContextType | null>(
  null
);

interface TableDataProviderProps {
  children: ReactNode;
}

export const DEFAULT_TABLE_COLUMNS: TableColumn[] = [
  {
    title: "Департамент",
    value: "Департамент",
    id: "department",
    isChosen: true,
  },
  { title: "Отдел", value: "Отдел", id: "division", isChosen: true },
  { title: "Команда", value: "Команда", id: "team", isChosen: true },
  {
    title: "Месяц",
    value: "Месяц",
    id: "month",
    isChosen: false,
  },
  { title: "Дата", value: "Дата", id: "date", isChosen: true },
  {
    title: "Кол-во отработанных часов",
    value: "Кол-во отработанных часов",
    id: "workHours",
    isChosen: true,
    hidden: true,
  },
];

const DEFAULT_GRID_COLUMNS = tableColumnsToGridColumns(DEFAULT_TABLE_COLUMNS);

interface TableDataContextState {
  tableData: DepartmentDataItem[] | null | undefined;
  tableColumns: TableColumn[];
  chosenGridColumns: GridColumn[];
}

export const TableDataProvider = ({ children }: TableDataProviderProps) => {
  const { items: departmentsData } = useDepartmentsDataContext();
  const isFirstRender = useIsFirstRender();

  const [contextState, setContextState] = useState<TableDataContextState>({
    tableData: undefined,
    tableColumns: DEFAULT_TABLE_COLUMNS,
    chosenGridColumns: DEFAULT_GRID_COLUMNS,
  });

  useEffect(() => {
    if (isFirstRender) return;

    const updateChosenGridColumns = () => {
      setContextState((prevState) => ({
        ...prevState,
        chosenGridColumns: tableColumnsToGridColumns(contextState.tableColumns),
      }));
    };

    updateChosenGridColumns();
  }, [contextState.tableColumns, isFirstRender]);

  useEffect(() => {
    const groupAndSortData = () => {
      if (!departmentsData) {
        setContextState((prevState) => ({
          ...prevState,
          tableData: null,
        }));
        return;
      }

      const activeColumnsMap: Map<string, boolean> = new Map();
      contextState.chosenGridColumns.forEach((column) => {
        activeColumnsMap.set(column.id!, true);
      });

      const valueColumnName = "workHours";
      const groupedItems = groupDepartmentDataValues(
        departmentsData,
        valueColumnName,
        activeColumnsMap
      );
      const sortedItems = sortDepartmentDataValues(
        groupedItems,
        activeColumnsMap
      );

      setContextState((prevState) => ({
        ...prevState,
        tableData: sortedItems,
      }));
    };

    groupAndSortData();
  }, [departmentsData, contextState.chosenGridColumns]);

  const selectColumn = useCallback((selectedColumnId: string) => {
    setContextState((prevState) => ({
      ...prevState,
      tableColumns: prevState.tableColumns.map((column) =>
        column.id === selectedColumnId ? { ...column, isChosen: true } : column
      ),
      tableData: null,
    }));
  }, []);

  const deselectColumn = useCallback((selectedColumnId: string) => {
    setContextState((prevState) => ({
      ...prevState,
      tableColumns: prevState.tableColumns.map((column) =>
        column.id === selectedColumnId ? { ...column, isChosen: false } : column
      ),
      tableData: null,
    }));
  }, []);

  return (
    <TableDataContext.Provider
      value={{
        tableData: contextState.tableData || [],
        tableColumns: contextState.tableColumns,
        chosenGridColumns: contextState.chosenGridColumns,
        selectColumn,
        deselectColumn,
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
};
