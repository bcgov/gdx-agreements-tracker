import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages";
import { Contacts } from "../../pages/Admin/Contacts";
import { Subcontractors } from "../../pages/Admin/Subcontractors";
import { Suppliers } from "../../pages/Admin/Suppliers";
import { Ministries } from "../../pages/Admin/Ministries";
import { Resources } from "../../pages/Admin/Resources";
import { Glossary } from "pages/Admin/Glossary";
import { Users } from "pages/Admin/Users";
import { Logs } from "pages/Admin/Logs";
import { ProjectAgreementTypeOptions } from "pages/Admin/ProjectAgreementTypes";
import { YesNoOptions } from "pages/Admin/PickerOptions/YesNoOption";
import { BillingPeriodOption } from "pages/Admin/PickerOptions/BillingPeriodOption";
import { ContractStatusOption } from "pages/Admin/PickerOptions/ContractStatusOption";

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
    <Route key="users" path="users" element={<Users />} />
    <Route key="logs" path="logs" element={<Logs />} />
    <Route
      key="project-agreement-types"
      path="project-agreement-types"
      element={<ProjectAgreementTypeOptions />}
    />
    <Route key="yes-no-option" path="yes-no-option" element={<YesNoOptions />} />
    <Route
      key="billing-period-option"
      path="billing-period-option"
      element={<BillingPeriodOption />}
    />
    <Route
      key="contract-status-option"
      path="contract-status-option"
      element={<ContractStatusOption />}
    />
  </Route>,
];

export default routes;
