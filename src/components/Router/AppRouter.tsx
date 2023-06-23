import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { DepartmentsTable } from "../../pages/DepartmentsTable/DepartmentsTable";
import { DepartmentsChart } from "../../pages/DepartmentsChart/DepartmentsChart";

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DepartmentsTable />} />
          <Route path="chart" element={<DepartmentsChart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
