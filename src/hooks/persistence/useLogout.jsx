// Import necessary modules and custom hooks
import { logout } from "../../services/MediSearchServices/AccountServices"; // Importing logout function from a service
import useAuth from "./useAuth"; // Custom hook to access authentication context
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { useConfirm } from "material-ui-confirm"; // Hook for displaying confirmation dialogs

// Custom hook for handling user logout
const useLogout = () => {
  const { setAuth } = useAuth(); // Accessing authentication context
  const navigate = useNavigate(); // Accessing navigation function
  const confirm = useConfirm(); // Accessing confirmation dialog function

  // Function to handle user logout
  const logoutUser = async () => {
    try {
      // Display a confirmation dialog before proceeding
      await confirm({
        title: "Confirmación",
        description: "¿Estás seguro que deseas cerrar sesión?",
        cancellationText: "Cancelar",
      });

      // Call the logout function from the service
      await logout();

      // Clear authentication data
      setAuth({});

      // Navigate the user to the home page after successful logout
      navigate("/");
    } catch (error) {
      // Log any errors that occur during the logout process
      console.log(error);
    }
  };

  return logoutUser; // Return the logout function to be used in components
};

export default useLogout; // Export the custom hook for user logout
