import React from "react";
import ReactECharts, { EChartsOption } from "echarts-for-react";

interface LineChartProps {
  chartOptions: EChartsOption;
  isLoading?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  chartOptions,
  isLoading = false,
}) => {
  return <ReactECharts option={chartOptions} showLoading={isLoading} />;
};
