import React from "react";
import { Route } from "react-router-dom";
// import { ProtectedRoute } from '../ProtectedRoute';
import { Project, List, Details, Status, ChangeRequest, Billing, LessonsLearned, CloseOut } from '../../pages/Project/index';

/**
 * Routes for Projects
 */
const projectRoutes = [
    <Route path="project" element={<Project />}>
        <Route path="list" element={<List />} />
        <Route path=":projectId" >
            <Route path="" element={<Details />} />
            <Route path="details" element={<Details />} />
            <Route path="status" element={<Status />} />
            <Route path="change-request" element={<ChangeRequest />} />
            <Route path="billing" element={<Billing />} />
            <Route path="lessons-learned" element={<LessonsLearned />} />
            <Route path="close-out" element={<CloseOut />} />
        </Route>
    </Route>
];

export default projectRoutes;
