import React from "react";
import { DepartmentsDataContext } from "../contexts/departmentsData.context";
import { DepartmentsDataContextType } from "../types/contexts";

export const useDepartmentsDataContext = () => {
  return React.useContext(DepartmentsDataContext) as DepartmentsDataContextType;
};
