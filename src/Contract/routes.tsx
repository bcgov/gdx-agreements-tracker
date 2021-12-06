import React from 'react';
import { Route } from "react-router-dom";
import { Contract, List, Details, Resources, Deliverables, InternalCoding, Amendments } from './index';

/**
 * Routes for Contracts
 */
const routes = [
    <Route key="contract" path="contract" element={<Contract />} >
        <Route path="list" element={<List />} />
        <Route path=":contractId" >
            <Route path="" element={<Details />} />
            <Route path="details" element={<Details />} />
            <Route path="resources" element={<Resources />} />
            <Route path="deliverables" element={<Deliverables />} />
            <Route path="internal-coding" element={<InternalCoding />} />
            <Route path="amendments" element={<Amendments />} />
        </Route>
    </Route>
];

export default routes;
