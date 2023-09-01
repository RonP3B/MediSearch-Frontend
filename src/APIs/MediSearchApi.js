// Import the Axios library for making HTTP requests
import axios from "axios";

// Create an instance of Axios with specific configuration
const MediSearchApi = axios.create({
  baseURL: import.meta.env.VITE_MEDISEARCH_API, // Set the base URL for API requests from environment variables
  withCredentials: true, // Include credentials (like cookies) in requests
  credentials: "include", // Specify how credentials should be included
  mode: "cors", // Set the mode for cross-origin requests
});

export default MediSearchApi;
