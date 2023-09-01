// Imports
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TuneIcon from "@mui/icons-material/Tune";
import ProductFilterDrawer from "../custom/FilterDrawers/ProductFilterDrawer";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import ProductCard from "../custom/Cards/ProductCard";
import useFilters from "../../hooks/filters/useFilters";
import {
  getLabProducts,
  getPharmacyProducts,
} from "../../services/MediSearchServices/HomeServices";

const Products = ({
  isCompany,
  logged,
  companyType,
  hideTitle,
  initialValues,
  initialHighestPrice,
}) => {
  // State variables for managing component behavior
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toast notification function and ref
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Custom filters and data management from useFilters hook
  const {
    filters,
    clearFilters,
    filteredData: filteredProducts,
    setPriceFilter,
    setMaxPrice,
  } = useFilters(products, true);

  // Fetch and set products on component mount or when values change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products based on the company type
        const res = await (companyType === "Laboratorio"
          ? getLabProducts()
          : getPharmacyProducts());

        const productsArr = res.data;

        // Calculate the highest price among fetched products
        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        // Update state with fetched products and filter parameters
        setProducts(productsArr);
        setPriceFilter([1, highestPrice]);
        setMaxPrice(highestPrice);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Show error toast for failed product fetch
        showToastRef.current(
          "Ocurrió un error al obtener las productos, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    // If initial values are provided, use them; otherwise, fetch products
    if (initialValues) {
      setProducts(initialValues.values);
      setPriceFilter([1, initialHighestPrice]);
      setMaxPrice(initialHighestPrice);
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, [
    companyType,
    initialHighestPrice,
    initialValues,
    setMaxPrice,
    setPriceFilter,
  ]);

  // Function to open the filter options
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  // Function to close the filter options
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      {/* Drawer for product filters */}
      <ProductFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        onClear={clearFilters}
        filters={filters}
        companyFilters={true}
      />

      {/* Stack for arranging title and filter button */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={!hideTitle && logged ? "space-between" : "flex-end"}
        mb={5}
      >
        {!hideTitle && logged && (
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {isCompany
              ? "Provisiones"
              : logged
              ? "Productos farmacéuticos"
              : "Productos"}
          </Typography>
        )}
        {!loading && products.length > 0 && (
          <Button
            variant="contained"
            startIcon={<TuneIcon />}
            onClick={handleOpenFilter}
          >
            Filtros
          </Button>
        )}
      </Stack>

      {/* Loading state */}
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

      {/* No products state */}
      {!loading && products.length === 0 && (
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
            No hay productos {isCompany && "de laboratorios "}
            {initialValues && "en tus favoritos"}
          </Typography>
        </Box>
      )}

      {/* Display products */}
      {products.length > 0 &&
        (filteredProducts.length > 0 ? (
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <ProductCard
                  favorite={
                    logged && {
                      isFavorite: product.isFavorite,
                      favoriteType: "product",
                    }
                  }
                  favoritesManager={initialValues}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={companyType}
                  to={`${
                    isCompany ? "/company/" : logged ? "/client/" : "/"
                  }products/product-details/${product.id}`}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          // No products match filter criteria
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "55vh",
            }}
          >
            <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              No hay productos que cumplan con los filtros
            </Typography>
          </Box>
        ))}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
Products.propTypes = {
  logged: PropTypes.bool.isRequired,
  isCompany: PropTypes.bool.isRequired,
  companyType: PropTypes.string.isRequired,
  hideTitle: PropTypes.bool,
  initialValues: PropTypes.object,
  initialHighestPrice: PropTypes.number,
};

export default Products;
