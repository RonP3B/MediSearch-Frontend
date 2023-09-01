// Import necessary modules
import { Route } from "react-router-dom";
import RequiresLab from "../routeGuards/RequiresLab";
import Companies from "../pages/Companies";

// Define a set of routes specifically for a laboratory context
const LabRoutes = () => {
  return (
    // Wrapping Route element to enforce lab requirements
    <Route element={<RequiresLab />}>
      {/* Sub-route for displaying companies of type 'farmacia' */}
      <Route
        path="/company/pharmacies"
        element={
          // Render the 'Companies' component with specific props
          <Companies companyType="farmacia" logged={true} isCompany={true} />
        }
      />
    </Route>
  );
};

// Export the LabRoutes component to use in the app's routing configuration
export default LabRoutes;
