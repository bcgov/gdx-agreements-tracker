import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages";
import { Contacts } from "../../pages/Admin/Contacts";
import { Subcontractors } from "../../pages/Admin/Subcontractors";
import { Suppliers } from "../../pages/Admin/Suppliers";
import { Ministries } from "../../pages/Admin/Ministries";
import { Resources } from "../../pages/Admin/Resources";
import { Glossary } from "pages/Admin/Glossary";

/*
 * Routes for Admin pages.
 */
const routes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    }
  >
    ,
    <Route key="contacts" path="contacts" element={<Contacts />} />
    <Route key="suppliers" path="suppliers" element={<Suppliers />} />
    <Route key="subcontractors" path="subcontractors" element={<Subcontractors />} />
    <Route key="resources" path="resources" element={<Resources />} />
    <Route key="ministries" path="ministries" element={<Ministries />} />
    <Route key="glossary" path="glossary" element={<Glossary />} />
  </Route>,
];

export default routes;
