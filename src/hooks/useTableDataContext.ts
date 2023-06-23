import React from "react";
import { TableDataContext } from "../contexts/tableData.context";
import { TableDataContextType } from "../types/contexts";

export const useTableDataContext = () => {
  return React.useContext(TableDataContext) as TableDataContextType;
};
