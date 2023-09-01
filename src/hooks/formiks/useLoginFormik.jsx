// Import necessary modules and custom hooks
import * as Yup from "yup";
import { login } from "../../services/MediSearchServices/AccountServices";
import { useNavigate } from "react-router-dom";
import useAuth from "../persistence/useAuth";
import decodeJWT from "../../utils/decodeJWT";
import useToast from "../feedback/useToast";

// Define a custom hook for handling login form using Formik
const useLoginFormik = (setLoading) => {
  // Using custom hooks for authentication, navigation, and toast messages
  const { setAuth } = useAuth(); // Accessing authentication context functions
  const navigate = useNavigate(); // Navigation function
  const showToast = useToast(); // Function to display toast messages
  const initialValues = { userName: "", password: "" }; // Initial form values

  // Define validation schema for form fields using Yup
  const validationSchema = Yup.object({
    userName: Yup.string().trim().required("Nombre de usuario requerido"),
    password: Yup.string().trim().required("Contraseña requerida"),
  });

  // Define the form submission logic
  const onSubmit = async (values) => {
    try {
      setLoading(true); // Set loading state to true during submission
      const res = await login(values); // Call the login function with form values
      const decoded = decodeJWT(res.data.jwToken); // Decode the JWT received from the response

      // Set the authentication state with the token and decoded payload
      setAuth({
        token: res.data.jwToken,
        payload: decoded,
      });

      // Determine the appropriate redirect path based on user role
      const redirectTo =
        decoded.roles === "Client" ? "/client/home" : "/company/dashboard";

      navigate(redirectTo); // Redirect the user to the appropriate path
    } catch (error) {
      showToast(error.response.data, { type: "error" }); // Show error toast on API error
    } finally {
      setLoading(false); // Set loading state back to false after submission
    }
  };

  // Return formik-related objects/functions for use in components
  return { initialValues, validationSchema, onSubmit };
};

export default useLoginFormik; // Export the custom hook for use in other components
