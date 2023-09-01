// Import necessary modules and functions
import MediSearchApi from "../../APIs/MediSearchApi"; // Importing the API utility
import decodeJWT from "../../utils/decodeJWT"; // Importing a function to decode JSON Web Tokens
import useAuth from "./useAuth"; // Custom hook for authentication

// Define the endpoints for refreshing and validating refresh tokens
const REFRESH_TOKEN_ENDPOINT = import.meta.env.VITE_MEDISEARCH_REFRESH_TOKEN;
const VALIDATE_REFRESH_TOKEN_ENDPOINT = import.meta.env
  .VITE_MEDISEARCH_VALIDATE_REFRESH_TOKEN;

// Custom hook for handling token refreshing
const useRefreshToken = () => {
  // Access the setAuth function from the useAuth hook
  const { setAuth } = useAuth();

  // Function to refresh the access token
  const refreshAccessToken = async () => {
    let token = null; // Initialize token variable

    try {
      // Validate if the refresh token is valid
      let res = await MediSearchApi.get(VALIDATE_REFRESH_TOKEN_ENDPOINT);
      const hasValidRefreshToken = res.data.validRefreshToken;

      if (!hasValidRefreshToken) return; // Exit if refresh token is invalid

      // Request a new access token using the refresh token
      res = await MediSearchApi.get(REFRESH_TOKEN_ENDPOINT);
      token = res.data.jwToken; // Store the new access token
      // Update authentication state with the new token and its decoded payload
      setAuth({
        token: token,
        payload: decodeJWT(res.data.jwToken),
      });
    } catch (error) {
      console.log(error); // Log any errors that occur during the refresh process
    }

    return token; // Return the new token, if obtained
  };

  // Return the refreshAccessToken function for use in components
  return { refreshAccessToken };
};

export default useRefreshToken; // Export the custom hook
