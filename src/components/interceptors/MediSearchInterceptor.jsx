// Imports
import { useEffect } from "react";
import MediSearchApi from "../../APIs/MediSearchApi";
import useRefreshToken from "../../hooks/persistence/useRefreshToken";
import useAuth from "../../hooks/persistence/useAuth";

// Define a component called MediSearchInterceptor
const MediSearchInterceptor = ({ children }) => {
  // Get authentication data and related functions from context
  const { auth, setAuth } = useAuth();

  // Get the refreshAccessToken function from some context
  const { refreshAccessToken } = useRefreshToken();

  // Set up an effect that intercepts requests and responses
  useEffect(() => {
    // Intercept requests and modify headers if needed
    const requestIntercept = MediSearchApi.interceptors.request.use(
      (config) => {
        // Check if there's no Authorization header and if auth data exists
        if (!config.headers["Authorization"] && auth) {
          // Set the Authorization header using the token from auth data
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }

        return config;
      }
    );

    // Intercept responses and handle errors
    const responseIntercept = MediSearchApi.interceptors.response.use(
      (response) => {
        return response;
      },

      async (error) => {
        // Get the original request and error data
        const prevRequest = error.config;
        const data = error?.response?.data;

        // If the error indicates an expired JWT token and the request hasn't been retried
        if (data?.Error === "ERR_JWT" && !prevRequest.sent) {
          // Mark the request as retried to prevent multiple attempts
          prevRequest.sent = true;

          // Attempt to refresh the access token
          const newToken = await refreshAccessToken();

          // If token refresh fails, clear authentication data and return
          if (!newToken) {
            setAuth({});
            return;
          }

          // Update the Authorization header with the new token
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;

          // Retry the original request with the updated token
          return MediSearchApi(prevRequest);
        }

        // If the error is not handled, reject the promise with the error
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts
    return () => {
      MediSearchApi.interceptors.request.eject(requestIntercept);
      MediSearchApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshAccessToken, setAuth]);

  return children;
};

export default MediSearchInterceptor;
