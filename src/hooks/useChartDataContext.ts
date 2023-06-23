import React from "react";
import { ChartDataContext } from "../contexts/chartData.context";
import { ChartDataContextType } from "../types/contexts";

export const useChartDataContext = () => {
  return React.useContext(ChartDataContext) as ChartDataContextType;
};
