// Imports
import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Create a context to hold authentication-related data -
const AuthContext = createContext();

// Provider component to wrap around the application
export const AuthProvider = ({ children }) => {
  // State to hold authentication data
  const [auth, setAuth] = useState({});

  // Provide the authentication data to the components within the context
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define PropTypes to specify expected props and their types
AuthProvider.propTypes = {
  children: PropTypes.element,
};

export default AuthContext;
