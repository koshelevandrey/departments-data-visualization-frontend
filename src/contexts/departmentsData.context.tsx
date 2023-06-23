import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getDepartmentsData } from "../api/api";
import { DepartmentDataItem } from "../types/data";
import { DepartmentsDataContextType } from "../types/contexts";

export const DepartmentsDataContext =
  createContext<DepartmentsDataContextType | null>(null);

interface DepartmentsDataProviderProps {
  children: ReactNode;
}

export const DepartmentsDataProvider = ({
  children,
}: DepartmentsDataProviderProps) => {
  const [items, setItems] = useState<DepartmentDataItem[] | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchBackendData = async () => {
      getDepartmentsData()
        .then((data) => setItems(data))
        .catch((error) => {
          console.error(error);
        });
    };

    fetchBackendData();
  }, []);

  return (
    <DepartmentsDataContext.Provider
      value={{
        items,
      }}
    >
      {children}
    </DepartmentsDataContext.Provider>
  );
};
