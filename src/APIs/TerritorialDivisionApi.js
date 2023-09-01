// Import the axios library for making HTTP requests
import axios from "axios";

// Create an instance of axios with a base URL for the TerritorialDivision API
const TerritorialDivisionApi = axios.create({
  baseURL: "https://api.digital.gob.do/v1/territories", // Base URL for the API
});

// Export the TerritorialDivisionApi instance for use in other parts of the application
export default TerritorialDivisionApi;
