// Import necessary module
import { useContext } from "react";
import AuthContext from "../../components/contexts/AuthContext";

// Custom hook to access authentication context
const useAuth = () => {
  // Retrieve authentication data from the context
  const authContext = useContext(AuthContext);

  // Check if the hook is being used within an AuthProvider
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  // Return the authentication data from the context
  return authContext;
};

// Export the custom hook for components to use
export default useAuth;
