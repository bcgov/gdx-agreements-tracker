// export default AppRouter;
import { Routes, Route } from "react-router-dom";
import { Home, PageNotFound } from "pages";
import { Main } from "components";
import { FC } from "react";
import projectRoutes from "./subRoutes/projectRoutes";
import contractRoutes from "./subRoutes/contractRoutes";
import adminRoutes from "./subRoutes/adminRoutes";
import reportRoutes from "./subRoutes/reportRoutes";
const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        {projectRoutes}
        {contractRoutes}
        {adminRoutes}
        {reportRoutes}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
