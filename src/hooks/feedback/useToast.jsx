// Import necessary modules
import { useContext } from "react";
import { toast } from "react-toastify";
import ColorModeContext from "../../components/contexts/ColorModeContext";

// Custom hook for displaying toasts
const useToast = () => {
  // Access the color mode value from the context
  const colorMode = useContext(ColorModeContext);

  // Function to display a toast message
  const showToast = (message, options = {}) => {
    // Customize toast options with the color mode theme
    const toastOptions = {
      ...options,
      theme: colorMode.mode, // Set the toast theme based on the color mode
    };

    // Display the toast message using react-toastify
    toast(message, toastOptions);
  };

  // Return the function to display toasts
  return showToast;
};

// Export the useToast hook for use in other components
export default useToast;
