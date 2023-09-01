// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Component for handling client role requirements
const RequiresClient = () => {
  // Fetch authentication data using the useAuth hook
  const { auth } = useAuth();

  // Extract the user's role from authentication data
  const role = auth.payload.roles;

  // Check if the user's role is not "Client"
  return role !== "Client" ? (
    // If the role is not "Client", redirect to the company dashboard
    <Navigate to="/company/dashboard" replace />
  ) : (
    // If the role is "Client", render the nested routes/components
    <Outlet />
  );
};

// Export the RequiresClient component
export default RequiresClient;
