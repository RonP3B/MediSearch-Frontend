// Import necessary modules and functions
import * as Yup from "yup";
import useToast from "../feedback/useToast";
import { editLoggedProfile } from "../../services/MediSearchServices/AdminServices";

// Custom hook for handling the Formik logic related to profile editing
const useProfileFormik = (setLoading, handleClose, setEdited) => {
  const showToast = useToast();

  // Function to retrieve initial form values based on the provided profile data
  const getInitialValues = (profile) => {
    return {
      image: null,
      firstName: profile.firstName,
      lastName: profile.lastName,
      province: profile.province,
      municipality: profile.municipality,
      address: profile.address,
    };
  };

  // Validation schema for form fields
  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
  });

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      // Edit the logged-in user's profile using the provided values
      await editLoggedProfile(values);
      // Display a success toast message
      showToast("Perfil editado", { type: "success" });
      // Increment the 'setEdited' state to trigger a refresh in the user's interface
      setEdited((prev) => prev + 1);
      // Close the form or modal
      handleClose();
    } catch (error) {
      // Display an error toast message with the response data
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Return the necessary functions and validation schema as an object
  return { getInitialValues, validationSchema, onSubmit };
};

// Export the custom Formik hook for profile editing
export default useProfileFormik;
