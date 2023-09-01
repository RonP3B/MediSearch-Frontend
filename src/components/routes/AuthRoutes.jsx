// Import necessary modules
import { Route } from "react-router-dom";
import RequiresAuth from "../routeGuards/RequiresAuth";
import CompanyRoutes from "./CompanyRoutes";
import ClientRoutes from "./ClientRoutes";

// Component to manage authenticated routes
const AuthRoutes = () => {
  return (
    // Use the Route component from react-router-dom to define an authenticated route
    <Route element={<RequiresAuth />}>
      {/* Include the routes for the company-specific section */}
      {CompanyRoutes()}
      {/* Include the routes for the client-specific section */}
      {ClientRoutes()}
    </Route>
  );
};

export default AuthRoutes;
