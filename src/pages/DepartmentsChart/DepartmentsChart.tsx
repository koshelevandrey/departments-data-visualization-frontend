import React from "react";
import ReactECharts from "echarts-for-react";
import { useChartDataContext } from "../../hooks/useChartDataContext";

export const DepartmentsChart: React.FC = () => {
  const { chartOptions, isLoading } = useChartDataContext();

  return <ReactECharts option={chartOptions} showLoading={isLoading} />;
};
