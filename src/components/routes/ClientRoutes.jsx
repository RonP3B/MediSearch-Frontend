// Imports
import { Route } from "react-router-dom";
import ClientHome from "../pages/ClientHome";
import ProductDetails from "../pages/ProductDetails";
import CompanyDetails from "../pages/CompanyDetails";
import Products from "../pages/Products";
import RequiresClient from "../routeGuards/RequiresClient";
import Companies from "../pages/Companies";
import Chat from "../pages/Chat";
import Profile from "../pages/Profile";
import Favorites from "../pages/Favorites";

// Component that defines routes accessible to clients
const ClientRoutes = () => {
  return (
    // Wrap the routes in a Route component with a guard for client access
    <Route element={<RequiresClient />}>
      {/* Home page for the client */}
      <Route path="/client/home" element={<ClientHome />} />

      {/* Chat page for the client */}
      <Route path="/client/chat" element={<Chat isCompany={false} />} />

      {/* Favorites page for the client */}
      <Route
        path="/client/favs"
        element={<Favorites isPharmacy={false} isLab={false} />}
      />

      {/* Products page for the client */}
      <Route
        path="/client/products"
        element={
          <Products isCompany={false} logged={true} companyType="Farmacia" />
        }
      />

      {/* Product details page for the client */}
      <Route
        path="client/products/product-details/:id"
        element={
          <ProductDetails
            logged={true}
            showCompanyInfo={true}
            isCompany={false}
          />
        }
      />

      {/* Company details page for the client */}
      <Route
        path="client/companies/company-details/:id"
        element={<CompanyDetails isCompany={false} />}
      />

      {/* Pharmacies page for the client */}
      <Route
        path="client/companies/pharmacies"
        element={
          <Companies companyType="farmacia" logged={true} isCompany={false} />
        }
      />

      {/* Client's profile page */}
      <Route
        path="/client/my-profile"
        element={
          <Profile profileType="perfil" isCompany={false} isClient={true} />
        }
      />
    </Route>
  );
};

export default ClientRoutes;
