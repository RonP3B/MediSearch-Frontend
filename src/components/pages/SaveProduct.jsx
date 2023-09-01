// Imports
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useToast from "../../hooks/feedback/useToast";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../custom/Buttons/SubmitButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import InputField from "../custom/InputFields/InputField";
import MultipleSelectField from "../custom/InputFields/MultipleSelectField";
import SelectInputField from "../custom/InputFields/SelectInputField";
import useProductFormik from "../../hooks/formiks/useProductFormik";
import MultipleFileInputField from "../custom/InputFields/MultipleFileInputField";
import { getProduct } from "../../services/MediSearchServices/ProductServices";
import ImageSlider from "../custom/ImageSlider/ImageSlider";
import useClassificationCategories from "../../hooks/useClassificationCategories";

// Retrieves the asset URL from Vite's environment variables
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const SaveProduct = ({ edit }) => {
  // Extract parameters and navigation function
  const { id } = useParams();
  const navigate = useNavigate();

  // State management
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(edit);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Toast notification
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Formik form reference
  const formikRef = useRef(null);

  // Custom hooks for classification and categories
  const {
    classifications,
    categories,
    setSelectedClassification,
    categoriesSelect,
    classificationsSelect,
  } = useClassificationCategories();

  // Custom hooks for form handling
  const { getInitialValues, getEditInitialValues, validationSchema, onSubmit } =
    useProductFormik(setSubmitLoading, edit);

  // Function to reset form values
  const resetFormValues = () => {
    formikRef.current.resetForm();
  };

  // Fetch product data when in edit mode
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Get data
        const res = await getProduct(id);
        const productRes = res.data;

        // Update product and images state based on fetched data
        setProduct(productRes);
        setImages(productRes.urlImages.map((url) => ASSETS + url));
      } catch (error) {
        // Handle errors related to product retrieval
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);
        showToastRef.current(
          "Ocurrió un error al obtener la información del producto, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    // Fetch product data when in edit mode
    edit && fetchProduct();
  }, [edit, id, navigate, setSelectedClassification]);

  // Update selected classification if product data change
  useEffect(() => {
    if (product && edit) {
      setSelectedClassification(product.classification);
    }
  }, [product, setSelectedClassification, edit]);

  // Reset form values and images when switching between edit and create mode
  useEffect(() => {
    if (!edit) {
      resetFormValues();
      setImages([]);
    }
  }, [edit]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      {/* Display title based on edit mode */}
      <Typography variant="h5" sx={{ mb: 5, fontWeight: "bold" }}>
        {edit ? "Editar" : "Crear"} producto
      </Typography>

      {/* Display "Volver" button when in edit mode */}
      {edit && (
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => navigate(-1)}
        >
          Volver
        </Button>
      )}

      {/* Show loading spinner if data is being loaded */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Display selected images with optional image slider */}
          {images.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* Show image slider if multiple images are selected */}
              {images.length > 1 ? (
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Imagenes seleccionadas:
                  </Typography>
                  <ImageSlider
                    images={images}
                    width="200px"
                    height="150px"
                    elevation={2}
                  />
                </>
              ) : (
                // * Show single selected image *
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Imagen seleccionada:
                  </Typography>
                  <Box
                    component="img"
                    src={images[0]}
                    width={200}
                    height={150}
                    sx={{
                      border: "2px solid",
                      borderColor: "primary.main",
                    }}
                  />
                </>
              )}
            </Box>
          )}

          {/* Formik form for creating/editing product */}
          <Formik
            enableReinitialize={true}
            initialValues={
              edit ? getEditInitialValues(product) : getInitialValues()
            }
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            innerRef={formikRef}
          >
            {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <MultipleFileInputField
                      accept="image/*"
                      label="Imagenes"
                      name="images"
                      setImages={setImages}
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="name"
                      label="Nombre del producto"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectInputField
                      label="Clasificación"
                      name="classification"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      options={["", ...classifications]}
                      setSelected={setSelectedClassification}
                      ref={classificationsSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MultipleSelectField
                      label="Categorías"
                      name="categories"
                      variant="filled"
                      margin="dense"
                      fullWidth
                      disabled={categories.length === 0}
                      options={categories}
                      ref={categoriesSelect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="price"
                      label="Precio"
                      type="number"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="quantity"
                      label="Cantidad"
                      type="number"
                      margin="dense"
                      variant="filled"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name="description"
                      label="Descripción del producto"
                      margin="dense"
                      variant="filled"
                      multiline
                      maxRows={4}
                      minRows={4}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="end" mt="20px">
                  <SubmitButton
                    loading={submitLoading}
                    text={`${edit ? "Editar" : "Crear"} producto`}
                    loadingText={`${edit ? "Editando" : "Creando"} producto...`}
                    variant="contained"
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
SaveProduct.propTypes = {
  edit: PropTypes.bool.isRequired,
};

export default SaveProduct;
