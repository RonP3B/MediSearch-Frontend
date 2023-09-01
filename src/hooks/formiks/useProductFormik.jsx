// Import required modules and functions
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useToast from "../feedback/useToast";
import {
  createProduct,
  editProduct,
} from "../../services/MediSearchServices/ProductServices";

// Custom hook for handling the Formik logic related to product creation/editing
const useProductFormik = (setLoading, edit) => {
  const navigate = useNavigate();
  const showToast = useToast();

  // Function to retrieve initial form values
  const getInitialValues = () => {
    return {
      name: "",
      description: "",
      classification: "",
      categories: [],
      price: "",
      quantity: "",
      images: [],
    };
  };

  // Function to retrieve initial form values for editing an existing product
  const getEditInitialValues = (product) => {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      classification: product.classification,
      categories: product.categories,
      price: product.price,
      quantity: product.quantity,
      images: [],
    };
  };

  // Validation schema for form fields
  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Nombre requerido"),
    description: Yup.string().trim().required("Descripción requerida"),
    classification: Yup.string().trim().required("Clasificación requerida"),
    categories: Yup.array().min(1, "Categoría requerida"),
    price: Yup.number("Solo se pueden ingresar números")
      .min(1, "El precio debe ser mayor o igual a 1")
      .required("El precio es requerido"),
    quantity: Yup.number("Solo se pueden ingresar números")
      .min(1, "La cantidad debe ser mayor o igual a 1")
      .required("La cantidad es requerida"),
    images: edit
      ? Yup.array()
      : Yup.array().min(1, "Seleccione al menos una imagen"),
  });

  // Function to handle form submission
  const onSubmit = async (values) => {
    try {
      setLoading(true);
      // Perform either product editing or creation based on 'edit' flag
      edit ? await editProduct(values) : await createProduct(values);
      // Navigate to a specific page after successful submission
      navigate("/company/my-products");
      // Display a success toast message
      showToast(`Producto ${edit ? "editado" : "creado"} con éxito`, {
        type: "success",
      });
    } catch (error) {
      // Display an error toast message with the response data
      showToast(error.response.data, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Return the necessary functions and validation schema as an object
  return { validationSchema, getInitialValues, getEditInitialValues, onSubmit };
};

// Export the custom Formik hook for product creation/editing
export default useProductFormik;
