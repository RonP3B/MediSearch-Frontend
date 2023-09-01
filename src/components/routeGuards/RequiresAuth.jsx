// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Component that enforces authentication before rendering its child routes
const RequiresAuth = () => {
  // Retrieve authentication data using the custom hook
  const { auth } = useAuth();

  // Check if a valid authentication token exists
  // If the token exists, render the child routes using Outlet component
  // If the token is missing, redirect the user to the home page ("/") using Navigate component with the "replace" option
  return auth.token ? <Outlet /> : <Navigate to="/" replace />;
};

// Export the RequiresAuth component for use in other parts of the application
export default RequiresAuth;
