// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth";

// Component for handling routes that require unauthenticated access
const RequiresUnauth = () => {
  // Retrieve authentication data using the useAuth hook
  const { auth } = useAuth();

  // Extract the user's role from the authentication payload
  const role = auth?.payload?.roles;

  // Determine the appropriate route to redirect based on the user's role
  const redirectTo = role === "Client" ? "/client/home" : "/company/dashboard";

  // If the user is not authenticated, allow rendering child routes (Outlet)
  // If the user is authenticated, redirect to the appropriate route
  return !auth.token ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

// Export the RequiresUnauth component for use in routing
export default RequiresUnauth;
