// Import necessary modules
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/persistence/useAuth"; // Importing a custom hook for authentication

// Component to handle routing based on user's role
const RequiresCompany = () => {
  // Using the useAuth hook to access authentication data
  const { auth } = useAuth();

  // Extracting the 'roles' property from authentication payload
  const role = auth.payload.roles;

  // Check if the user's role is 'Client'
  return role === "Client" ? (
    // If user is a client, navigate to client's home page
    <Navigate to="/client/home" replace />
  ) : (
    // If user has a different role, render the nested routes within this component
    <Outlet />
  );
};

// Export the RequiresCompany component for use in other parts of the application
export default RequiresCompany;
