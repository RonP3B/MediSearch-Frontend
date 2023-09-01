// Imports
import { Route } from "react-router-dom";
import RequiresUnauth from "../routeGuards/RequiresUnauth";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PasswordRecovery from "../pages/PasswordRecovery";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import CompanyDetails from "../pages/CompanyDetails";
import Companies from "../pages/Companies";
import HomeProducts from "../pages/HomeProducts";

// Component for rendering routes accessible to unauthenticated users
const UnauthRoutes = () => {
  return (
    // Define a route element that requires unauthenticated access
    <Route element={<RequiresUnauth />}>
      {/* Login route */}
      <Route path="login" element={<Login />} />

      {/* Signup route */}
      <Route path="signup" element={<Signup />} />

      {/* Password recovery route */}
      <Route path="/password-recovery" element={<PasswordRecovery />} />

      {/* Home route */}
      <Route path="/" element={<Home />} />

      {/* HomeProducts route */}
      <Route path="/products" element={<HomeProducts />} />

      {/* Route for displaying product details */}
      <Route
        path="/products/product-details/:id"
        element={
          <ProductDetails
            logged={false}
            showCompanyInfo={true}
            isCompany={false}
          />
        }
      />

      {/* Route for displaying company details */}
      <Route
        path="/companies/company-details/:id"
        element={<CompanyDetails isCompany={false} />}
      />

      {/* Route for displaying pharmacies */}
      <Route
        path="/companies/pharmacies"
        element={
          <Companies companyType="farmacia" logged={false} isCompany={false} />
        }
      />

      {/* Route for displaying labs */}
      <Route
        path="/companies/labs"
        element={
          <Companies
            companyType="laboratorio"
            logged={false}
            isCompany={false}
          />
        }
      />
    </Route>
  );
};

export default UnauthRoutes;
