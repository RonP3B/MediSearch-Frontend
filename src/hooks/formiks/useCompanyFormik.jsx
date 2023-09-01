// Imports
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerCompany } from "../../services/MediSearchServices/AccountServices";
import useToast from "../feedback/useToast";

const useCompanyFormik = (setLoading) => {
  const navigate = useNavigate(); // Hook for navigation
  const showToast = useToast(); // Custom hook for displaying toast messages

  // Initial values for the company registration form
  const initialCompanyValues = {
    ceo: "",
    nameCompany: "",
    imageLogo: null,
    provinceCompany: "",
    municipalityCompany: "",
    addressCompany: "",
    emailCompany: "",
    phoneCompany: "",
    companyType: "",
    webSite: "",
    facebook: "",
    instagram: "",
    twitter: "",
  };

  // Schema for validating company information
  const validationCompanySchema = Yup.object({
    ceo: Yup.string().trim().required("CEO requerido"),
    nameCompany: Yup.string().trim().required("Nombre requerido"),
    imageLogo: Yup.mixed().required("Logo requerido"),
    provinceCompany: Yup.string().trim().required("Provincia requerida"),
    municipalityCompany: Yup.string().trim().required("Municipio requerido"),
    addressCompany: Yup.string().trim().required("Dirección requerida"),
    emailCompany: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
    phoneCompany: Yup.string()
      .trim()
      .required("Teléfono requerido")
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "El número de teléfono debe tener 10 dígitos"
      ),
    companyType: Yup.string().required("Tipo de empresa requerido"),
  });

  // Schema for validating company social media URLs
  const validationCompanySocialsSchema = Yup.object({
    webSite: Yup.string().trim().url("URL del sitio web inválida").nullable(),
    facebook: Yup.string().trim().url("URL de Facebook inválida").nullable(),
    instagram: Yup.string().trim().url("URL de Instagram inválida").nullable(),
    twitter: Yup.string().trim().url("URL de Twitter inválida").nullable(),
  });

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      setLoading(true); // Set loading state
      await registerCompany(values); // Register the company
      navigate("/login"); // Navigate to login page

      // Display success toast message
      showToast("Empresa registrada, revisa su correo para activarla", {
        type: "success",
      });
    } catch (error) {
      showToast(error.response.data, { type: "error" }); // Display error toast message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return {
    initialCompanyValues,
    validationCompanySchema,
    validationCompanySocialsSchema,
    onSubmit,
  };
};

export default useCompanyFormik;
