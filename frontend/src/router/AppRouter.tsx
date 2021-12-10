import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import projectRoutes from "./routes/projectRoutes";
import contractRoutes from "./routes/contractRoutes";
import adminRoutes from "./routes/adminRoutes";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={Home} />} />
      {projectRoutes}
      {contractRoutes}
      {adminRoutes}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
