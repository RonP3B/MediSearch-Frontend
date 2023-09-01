// Import necessary components and modules
import { Route } from "react-router-dom";
import SaveUser from "../pages/SaveUser";
import RequiresSuperAdmin from "../routeGuards/RequiresSuperAdmin";
import Profile from "../pages/Profile";

// Component for defining routes accessible to super administrators
const SuperAdminRoutes = () => {
  return (
    <Route element={<RequiresSuperAdmin />}>
      {/* Defining a Route with RequiresSuperAdmin as its guard */}
      <Route path="/company/users/add" element={<SaveUser />} />
      {/* Route for adding company users */}
      <Route
        path="/company/my-company"
        element={
          <Profile profileType="empresa" isCompany={true} isClient={false} />
        }
      />
      {/* Route for displaying company profile */}
    </Route>
  );
};

export default SuperAdminRoutes;
