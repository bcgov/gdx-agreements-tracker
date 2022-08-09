import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import projectRoutes from "./subRoutes/projectRoutes";
import contractRoutes from "./subRoutes/contractRoutes";
import adminRoutes from "./subRoutes/adminRoutes";
import reportRoutes from "./subRoutes/reportRoutes";
import { Home, Login, PageNotFound } from "../pages";
import { Main } from "../components";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={Main} />}>
        <Route index element={<Home />} />
        {projectRoutes}
        {contractRoutes}
        {adminRoutes}
        {reportRoutes}
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
