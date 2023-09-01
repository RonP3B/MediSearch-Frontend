// Imports
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../feedback/useToast";
import { registerEmployee } from "../../services/MediSearchServices/AdminServices";

const useEmployeeRegisterFormik = (setLoading) => {
  const navigate = useNavigate(); // Hook for navigation between routes
  const showToast = useToast(); // Hook for displaying toasts

  // Initial values for the registration form fields
  const initialValues = {
    firstName: "",
    lastName: "",
    province: "",
    municipality: "",
    address: "",
    phoneNumber: "",
    email: "",
    role: "",
  };

  // Validation schema for the registration form fields
  const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    role: Yup.string().trim().required("Rol requerido"),
    province: Yup.string().trim().required("Provincia requerida"),
    municipality: Yup.string().trim().required("Municipio requerido"),
    address: Yup.string().trim().required("Dirección requerida"),
    phoneNumber: Yup.string()
      .trim()
      .matches(
        /^\(\d{3}\) \d{3}-\d{4}$/,
        "El número de teléfono debe tener 10 dígitos"
      )
      .required("Teléfono requerido"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      setLoading(true); // Set loading state
      await registerEmployee(values); // Call the function to register the employee
      navigate("/company/users"); // Navigate to the specified route on success
      showToast("Usuario registrado", {
        type: "success", // Show a success toast message
      });
    } catch (error) {
      showToast(error.response.data, { type: "error" }); // Show an error toast message with the response data
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return { validationSchema, initialValues, onSubmit };
};

export default useEmployeeRegisterFormik;
