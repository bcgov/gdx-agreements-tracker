import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Contract, Contracts } from "../../pages";
import { Amendments } from "pages/Contracts/Contract/Amendments";
import { ContractDetails } from "pages/Contracts/Contract/ContractDetails";
import { InvoiceProcessing } from "pages/Contracts/Contract/InvoiceProcessing";
import { Deliverables } from "pages/Contracts/Contract/Deliverables";
import { ContractResources } from "pages/Contracts/Contract/Resources";
import { InternalCoding } from "pages/Contracts/Contract/InternalCoding";

const contractRoutes = [
  <Route key="contracts" path="/contracts" element={<ProtectedRoute><Contracts /></ProtectedRoute>}></Route>,
  <Route key="contractId" path="contracts/:contractId" element={<ProtectedRoute><Contract /></ProtectedRoute>}>,
    <Route index key="contractdetails" element={<ContractDetails />} />
    <Route key="resources" path="resources" element={<ContractResources />} />
    <Route key="deliverables" path="deliverables" element={<Deliverables />} />
    <Route key="invoice-processing" path="invoice-processing" element={<InvoiceProcessing />} />
    <Route key="gdx-internal-coding" path="internal-coding" element={<InternalCoding />} />
    <Route key="amendments" path="amendments" element={<Amendments />} />
  </Route>
];

export default contractRoutes;


