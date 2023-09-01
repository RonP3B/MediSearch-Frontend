// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Define a component to ensure access is limited to SuperAdmin users
const RequiresSuperAdmin = () => {
  // Get authentication information using the custom useAuth hook
  const { auth } = useAuth();

  // Extract the user's role from the authentication payload
  const role = auth.payload.roles;

  // Check if the user's role is not "SuperAdmin"
  return role !== "SuperAdmin" ? (
    // If not a SuperAdmin, redirect to the company dashboard
    <Navigate to="/company/dashboard" replace />
  ) : (
    // If a SuperAdmin, render the nested components within the Outlet
    <Outlet />
  );
};

// Export the RequiresSuperAdmin component for use in other parts of the application
export default RequiresSuperAdmin;
