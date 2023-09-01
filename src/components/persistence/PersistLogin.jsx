// Import necessary modules
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/persistence/useAuth";
import useRefreshToken from "../../hooks/persistence/useRefreshToken";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Define a component for handling persistent login
const PersistLogin = () => {
  // Get authentication data from custom hook
  const { auth } = useAuth();

  // Get the function to refresh access token from custom hook
  const { refreshAccessToken } = useRefreshToken();

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Use effect to handle access token refresh and loading status
  useEffect(() => {
    const handleAccessTokenRefresh = async () => {
      try {
        // If there's no access token, refresh it
        if (!auth.token) await refreshAccessToken();
      } catch (error) {
        console.error(error);
      } finally {
        // Whether success or error, loading is done
        setLoading(false);
      }
    };

    handleAccessTokenRefresh();
  }, [auth, refreshAccessToken]);

  return (
    <>
      {loading ? (
        // While loading, display a loading indicator
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "85vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // Once loading is done, display the nested routes/components
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
