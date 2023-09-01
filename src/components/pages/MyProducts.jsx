// Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import {
  deleteProduct,
  getAllProducts,
} from "../../services/MediSearchServices/ProductServices";

const MyProducts = () => {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [filterTerm, setFilterTerm] = useState(""); // State to hold the filter term for searching products
  const [showFilter, setShowFilter] = useState(false); // State to control whether the filter is shown
  const [loading, setLoading] = useState(true); // State to manage loading state while fetching products

  const showToast = useToast(); // Access the toast function using a custom hook
  const showToastRef = useRef(showToast); // Create a reference to the showToast function using a ref

  // Access the confirm function using a custom hook
  const confirm = useConfirm();

  // Fetch products from a data source when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products using an API call (getAllProducts)
        const res = await getAllProducts();

        // Update the products state with the fetched data
        setProducts(res.data);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Show an error toast if fetching products fails
        showToastRef.current(
          "Ocurrió un error al obtener los productos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Show a confirmation dialog using the confirm function
      await confirm({
        title: "Confirmación",
        description: "¿Estás seguro que deseas eliminar este producto?",
        cancellationText: "Cancelar",
      });

      // Delete the product using an API call (deleteProduct)
      await deleteProduct(id);

      // Update the products state by removing the deleted product
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      // Show a success toast after successful deletion
      showToast("Producto eliminado con éxito", { type: "success" });
    } catch (error) {
      // Handle errors during product deletion
      if (error?.response)
        showToast(
          "Ocurrió un error al intentar eliminar un producto, informelo al equipo técnico",
          { type: "error" }
        );
    }
  };

  // Filter the products based on the filter term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      {/* Title and "Nuevo producto" button */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Productos
        </Typography>
        <Button
          component={Link}
          to="add"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Nuevo producto
        </Button>
      </Stack>

      {/* Loading spinner */}
      {loading && (
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
      )}

      {/* Filtering and search */}
      {!loading && products.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton
            onClick={() => setShowFilter((prev) => !prev)}
            sx={{ mr: 0.75 }}
            size="medium"
          >
            <SearchIcon size="medium" />
          </IconButton>
          <TextField
            label="Filtrar por nombre"
            value={filterTerm}
            onChange={(event) => setFilterTerm(event.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              boxShadow: 2,
              transition: "width 0.3s ease-in-out",
              width: showFilter ? { xs: "210px", sm: "300px" } : "0",
              ".css-1d3z3hw-MuiOutlinedInput-notchedOutline, .css-9425fu-MuiOutlinedInput-notchedOutline":
                {
                  display: showFilter ? "block" : "none",
                },
              "label[data-shrink=false]+.MuiInputBase-formControl .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input":
                {
                  visibility: showFilter ? "visible" : "hidden",
                },
            }}
          />
        </Box>
      )}

      {/* No products found */}
      {products.length === 0 && !loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "55vh",
          }}
        >
          <ProductionQuantityLimitsIcon
            sx={{ fontSize: 200, color: "primary.main" }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay productos registrados
          </Typography>
          <Button
            component={Link}
            to="add"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
          >
            Nuevo producto
          </Button>
        </Box>
      )}

      {/* Display filtered or no-match products */}
      {products.length > 0 &&
        (filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard
                  favorite={false}
                  product={product}
                  maintenance={true}
                  showCompanyInfo={false}
                  handleDelete={handleDelete}
                  to={`/company/my-products/product-details/${product.id}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          /* No products match filter */
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55vh",
            }}
          >
            <SearchOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay productos con el nombre &apos;{filterTerm}&apos;
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

export default MyProducts;
