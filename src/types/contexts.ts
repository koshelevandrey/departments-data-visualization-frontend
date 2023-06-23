import { DepartmentDataItem } from "./data";
import { GridColumn } from "@glideapps/glide-data-grid";
import { EChartsOption } from "echarts-for-react";
import { TableColumn } from "./table";

export type DepartmentsDataContextType = {
  items: DepartmentDataItem[] | undefined;
};

export type TableDataContextType = {
  tableData: DepartmentDataItem[];
  tableColumns: TableColumn[];
  chosenGridColumns: GridColumn[];
  selectColumn: (id: string) => void;
  deselectColumn: (id: string) => void;
};

export type ChartDataContextType = {
  isLoading: boolean;
  chartOptions: EChartsOption | undefined;
};
