// Imports
import { Route } from "react-router-dom";
import RequiresPharmacy from "../routeGuards/RequiresPharmacy";
import Companies from "../pages/Companies";
import Products from "../pages/Products";

// Component defining pharmacy-specific routes
const PharmacyRoutes = () => {
  return (
    <>
      {/* Wrapper route that requires pharmacy-related authentication */}
      <Route element={<RequiresPharmacy />}>
        {/* Route for the "Companies" page under the /company/labs path */}
        <Route
          path="/company/labs"
          element={
            <Companies
              companyType="laboratorio"
              logged={true}
              isCompany={true}
            />
          }
        />

        {/* Route for the "Products" page under the /company/provisions path */}
        <Route
          path="/company/provisions"
          element={
            <Products
              isCompany={true}
              logged={true}
              companyType="Laboratorio"
            />
          }
        />
      </Route>
    </>
  );
};

export default PharmacyRoutes;
