// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Define a component called RequiresLab
const RequiresLab = () => {
  // Retrieve authentication data using the useAuth hook
  const { auth } = useAuth();

  // Extract the user's role from authentication payload
  const role = auth.payload.RoleType;

  // Check if the user's role is not "Laboratorio"
  return role !== "Laboratorio" ? (
    // If the role is not "Laboratorio", navigate to the company dashboard
    <Navigate to="/company/dashboard" replace />
  ) : (
    // If the role is "Laboratorio", render nested routes/components
    <Outlet />
  );
};

// Export the RequiresLab component
export default RequiresLab;
