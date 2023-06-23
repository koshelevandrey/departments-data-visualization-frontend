import React from "react";
import { AppRouter } from "./components/Router/AppRouter";
import { DepartmentsDataProvider } from "./contexts/departmentsData.context";
import { TableDataProvider } from "./contexts/tableData.context";
import { ChartDataProvider } from "./contexts/chartData.context";

export const App: React.FC = () => {
  return (
    <DepartmentsDataProvider>
      <TableDataProvider>
        <ChartDataProvider>
          <AppRouter />
        </ChartDataProvider>
      </TableDataProvider>
    </DepartmentsDataProvider>
  );
};
