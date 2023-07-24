import { Route } from "react-router-dom";
import { Reports } from "../../pages";
import ProtectedRoute from "routes/ProtectedRoute";
const reportRoutes = [
  <Route
    key="report"
    path="reports"
    element={
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    }
  />,
];

export default reportRoutes;
