import React from "react";
import { useChartDataContext } from "../../hooks/useChartDataContext";
import { LineChart } from "../../components/LineChart/LineChart";

export const DepartmentsChart: React.FC = () => {
  const { chartOptions, isLoading } = useChartDataContext();

  return <LineChart chartOptions={chartOptions} isLoading={isLoading} />;
};
