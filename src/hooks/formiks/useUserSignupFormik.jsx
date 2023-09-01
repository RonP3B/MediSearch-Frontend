// Import required modules and functions
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/MediSearchServices/AccountServices";
import useToast from "../feedback/useToast";

// Custom hook for handling the Formik logic for user signup
const useUserSignupFormik = (setLoading) => {
  const navigate = useNavigate();
  const showToast = useToast();

  // Initial values for user signup form fields
  const initialUserValues = {
    firstName: "",
    lastName: "",
    userName: "",
    image: null,
    province: "",
    municipality: "",
    address: "",
    phoneNumber: "",
    password: "",
    confirmPass: "",
    email: "",
  };

  // Validation schema for user signup form fields
  const validationUserSchema = Yup.object({
    firstName: Yup.string().trim().required("Nombre requerido"),
    lastName: Yup.string().trim().required("Apellido requerido"),
    userName: Yup.string()
      .trim()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
      .required("Nombre de usuario requerido"),
    image: Yup.mixed().required("Imagen requerida"),
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
    password: Yup.string()
      .required("Contraseña requerida")
      .matches(
        /^(?=.*[a-z])/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .matches(/^(?=.*\d)/, "La contraseña debe contener al menos un número")
      .matches(
        /^(?=.*[!@#$%^&*()_\-+=[\]{};:<>|./?])/,
        "La contraseña debe contener al menos un carácter especial"
      )
      .matches(
        /^(?=.{8,})/,
        "La contraseña debe tener un mínimo de 8 caracteres"
      ),
    confirmPass: Yup.string()
      .required("Confirmar contraseña requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  // Function to handle form submission when registering a user
  const onSubmitUser = async (values) => {
    try {
      setLoading(true);

      // Call the function to register the user
      await registerUser(values);

      // Navigate to the login page after successful registration
      navigate("/login");

      // Display a success toast message
      showToast("Usuario registrado, revisa su correo para activarlo", {
        type: "success",
      });
    } catch (error) {
      // Display an error toast message with the response data
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Return the validation schema, initial values, and the submission function
  return { validationUserSchema, initialUserValues, onSubmitUser };
};

// Export the custom Formik hook for user registration
export default useUserSignupFormik;
