import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useDepartmentsDataContext } from "../hooks/useDepartmentsDataContext";
import { EChartsOption } from "echarts-for-react";
import { groupChartValues } from "../utils/groupBy";
import { ChartDataContextType } from "../types/contexts";
import { ChartValue } from "../types/chart";
import { departmentsDataToChartValues } from "../utils/mapper.utils";
import { sortChartValues } from "../utils/sort.utils";

export const ChartDataContext = createContext<ChartDataContextType | null>(
  null
);

const CHART_TYPE = "line";
const CHART_X_AXIS_NAME = "Кол-во отработанных часов";
const CHART_TEXT_FONT_FAMILY = "Inter, sans-serif";
const CHART_TEXT_COLOR = "#333";
const CHART_DEFAULT_OPTIONS: EChartsOption = {
  textStyle: {
    fontFamily: CHART_TEXT_FONT_FAMILY,
    color: CHART_TEXT_COLOR,
  },
  legend: {
    data: [CHART_X_AXIS_NAME],
    textStyle: {
      fontSize: "16px",
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    data: [],
  },
  yAxis: {},
  series: [
    {
      name: CHART_X_AXIS_NAME,
      data: [],
      type: CHART_TYPE,
    },
  ],
};

interface ChartDataProviderProps {
  children: ReactNode;
}

export const ChartDataProvider = ({ children }: ChartDataProviderProps) => {
  const { items: departmentsData } = useDepartmentsDataContext();

  const [chartOptions, setChartOptions] = useState<EChartsOption>(
    CHART_DEFAULT_OPTIONS
  );

  useEffect(() => {
    const updateChartOptions = () => {
      if (!departmentsData) {
        return;
      }

      const chartValues: ChartValue[] =
        departmentsDataToChartValues(departmentsData);
      const groupedChartValues = groupChartValues(chartValues);
      const sortedValues = sortChartValues(groupedChartValues);

      const chartXAxisData: string[] = [];
      const chartYAxisData: string[] = [];

      sortedValues.forEach(({ label, value }) => {
        chartXAxisData.push(label);
        chartYAxisData.push(value);
      });

      setChartOptions({
        ...CHART_DEFAULT_OPTIONS,
        xAxis: {
          data: chartXAxisData,
        },
        series: [
          {
            name: CHART_X_AXIS_NAME,
            data: chartYAxisData,
            type: CHART_TYPE,
          },
        ],
      });
    };

    updateChartOptions();
  }, [departmentsData]);

  return (
    <ChartDataContext.Provider
      value={{
        isLoading: !departmentsData,
        chartOptions,
      }}
    >
      {children}
    </ChartDataContext.Provider>
  );
};
