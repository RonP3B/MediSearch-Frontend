// Imports
import * as Yup from "yup";
import useToast from "../feedback/useToast";
import { editCompanyLoggedProfile } from "../../services/MediSearchServices/AdminServices";

const useCompanyProfileFormik = (setLoading, handleClose, setEdited) => {
  // Import the useToast hook for displaying toast messages
  const showToast = useToast();

  // Function to initialize form values based on a profile
  const getInitialValues = (profile) => {
    return {
      logo: null,
      ceo: profile.ceo,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      province: profile.province,
      municipality: profile.municipality,
      address: profile.address,
      webSite: profile.webSite || "", // Set to provided website or empty string if not available
      facebook: profile.facebook || "", // Set to provided Facebook link or empty string if not available
      instagram: profile.instagram || "", // Set to provided Instagram link or empty string if not available
      twitter: profile.twitter || "", // Set to provided Twitter link or empty string if not available
    };
  };

  // Validation schema for the form fields using Yup
  const validationSchema = Yup.object({
    ceo: Yup.string().trim().required("CEO requerido"),
    name: Yup.string().trim().required("Nombre requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
    phone: Yup.string()
      .trim()
      .required("Teléfono requerido")
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "El número de teléfono debe tener 10 dígitos"
      ),
    webSite: Yup.string().trim().url("URL del sitio web inválida").nullable(),
    facebook: Yup.string().trim().url("URL de Facebook inválida").nullable(),
    instagram: Yup.string().trim().url("URL de Instagram inválida").nullable(),
    twitter: Yup.string().trim().url("URL de Twitter inválida").nullable(),
  });

  // Define an asynchronous function to handle form submission
  const onSubmit = async (values) => {
    try {
      // Set loading state to indicate processing
      setLoading(true);

      // Call the 'editCompanyLoggedProfile' function to update company information
      await editCompanyLoggedProfile(values);

      // Display a success toast message after successful profile edit
      showToast("Informacion de la empresa editada", { type: "success" });

      // Increment the 'edited' state to trigger a re-render of relevant components
      setEdited((prev) => prev + 1);

      // Close the modal or form after successful submission
      handleClose();
    } catch (error) {
      // If an error occurs during submission, show an error toast with the error message
      showToast(error.response.data, { type: "error" });
    } finally {
      // Regardless of success or failure, reset the loading state to 'false'
      setLoading(false);
    }
  };

  return {
    getInitialValues,
    validationSchema,
    onSubmit,
  };
};

export default useCompanyProfileFormik;
