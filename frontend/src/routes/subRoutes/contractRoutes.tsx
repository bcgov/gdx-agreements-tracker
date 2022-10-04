import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../components/PageLink";
import { Contract, Contracts } from "../../pages";
import { Amendments } from "pages/Contracts/Contract/Amendments";
import { ContractDetails } from "pages/Contracts/Contract/ContractDetails";
import { InvoiceProcessing } from "pages/Contracts/Contract/InvoiceProcessing";
import { Deliverables } from "pages/Contracts/Contract/Deliverables";

const contractRoutes = [
  <Route key="contracts" path="/contracts" element={<ProtectedRoute component={Contracts} />} />,
  <Route key="id" path="/contracts/:id" element={<ProtectedRoute component={Contract} />}>
    <Route index key="contractdetails" element={<ContractDetails />} />,
    <Route
      key="Resources"
      path="contracts/resources"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Resources");
          }}
        />
      }
    />
    ,
    <Route key="deliverables" path="/contracts/:id/deliverables" element={<Deliverables />} />
    ,
    <Route
      key="internal-coding"
      path="contracts/internal-coding"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("InternalCoding");
          }}
        />
      }
    />
    ,
    <Route key="invoice-processing" path="invoice-processing" element={<InvoiceProcessing />} />
    <Route key="amendments" path="amendments" element={<Amendments />} />
  </Route>,
];

export default contractRoutes;
