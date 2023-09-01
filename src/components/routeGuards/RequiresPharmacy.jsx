// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Define a component that checks the user's role and redirects accordingly
const RequiresPharmacy = () => {
  // Get authentication data using the useAuth hook
  const { auth } = useAuth();

  // Extract the user's role from authentication data
  const role = auth.payload.RoleType;

  // Check if the user's role is not "Farmacia"
  // If not, redirect to "/company/dashboard"
  return role !== "Farmacia" ? (
    <Navigate to="/company/dashboard" replace />
  ) : (
    // If the user's role is "Farmacia", render the nested components
    <Outlet />
  );
};

// Export the RequiresPharmacy component
export default RequiresPharmacy;
