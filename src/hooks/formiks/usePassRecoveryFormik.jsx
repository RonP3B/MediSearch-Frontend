// Imports
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../feedback/useToast";
import {
  changePassword,
  confirmCode,
  findUserReset,
} from "../../services/MediSearchServices/AccountServices";

// Custom hook for handling password recovery form using Formik
const usePassRecoveryFormik = (
  setLoading, // Function to set loading state
  setEmailSent, // Function to set email sent state
  setCodeValidated, // Function to set code validation state
  setActiveStep // Function to set active step state
) => {
  // Import necessary hooks
  const navigate = useNavigate(); // React Router hook for navigation
  const showToast = useToast(); // Custom toast notification hook

  // Initial values for the form fields
  const initialValues = {
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  // Form validation schema for finding user by email
  const findUserValidation = Yup.object({
    email: Yup.string()
      .trim()
      .required("Correo electrónico requerido")
      .matches(/^\S+@\S+\.\S+$/, "Formato de correo electrónico inválido"),
  });

  // Form validation schema for validating the received code
  const codeValidation = Yup.object({
    code: Yup.string().trim().required("Código requerido"),
  });

  // Form validation schema for setting a new password
  const newPassValidation = Yup.object({
    newPassword: Yup.string()
      .required("Nueva contraseña requerida")
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
    confirmNewPassword: Yup.string()
      .required("Confirmar nueva contraseña requerido")
      .oneOf([Yup.ref("newPassword"), null], "Las contraseñas deben coincidir"),
  });

  // Function to handle submission when finding a user
  const onSubmitFindUser = async (values) => {
    try {
      setLoading(true);
      await findUserReset(values);
      setEmailSent(true);
      showToast("Se ha enviado el código al correo electrónico del usuario", {
        type: "success",
      });
      setActiveStep(1);
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle submission of the validation code
  const onSubmitCode = async (values) => {
    try {
      setLoading(true);
      await confirmCode(values);
      setCodeValidated(true);
      setActiveStep(2);
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle submission of the new password
  const onSubmitNewPassword = async (values) => {
    try {
      setLoading(true);
      await changePassword(values);
      navigate("/login");
      showToast("Su contraseña ha sido cambiada correctamente", {
        type: "success",
      });
      setActiveStep(3);
    } catch (error) {
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Return all the necessary values and functions as an object
  return {
    initialValues,
    findUserValidation,
    codeValidation,
    newPassValidation,
    onSubmitFindUser,
    onSubmitCode,
    onSubmitNewPassword,
  };
};

export default usePassRecoveryFormik;
