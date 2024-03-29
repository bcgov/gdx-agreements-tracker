// export default AppRouter;
import { Routes, Route } from "react-router-dom";
import { Home, PageNotFound } from "pages";
import { Main } from "components";
import { FC } from "react";
import projectRoutes from "./subRoutes/projectRoutes";
import contractRoutes from "./subRoutes/contractRoutes";
import adminRoutes from "./subRoutes/adminRoutes";
import reportRoutes from "./subRoutes/reportRoutes";
import Signout from "pages/Signout";
import Unauthorized from "pages/Unauthorized";
const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/Signout" element={<Signout />} />
        {projectRoutes}
        {contractRoutes}
        {adminRoutes}
        {reportRoutes}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
