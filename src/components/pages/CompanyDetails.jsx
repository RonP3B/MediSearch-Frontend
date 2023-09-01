// Imports
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useToast from "../../hooks/feedback/useToast";
import useAuth from "../../hooks/persistence/useAuth";
import { getCompanyById } from "../../services/MediSearchServices/HomeServices";
import CustomTabs from "../custom/Tabs/CustomTabs";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductCard from "../custom/Cards/ProductCard";
import CompanySocials from "../custom/Socials/CompanySocials";
import ProductFilterDrawer from "../custom/FilterDrawers/ProductFilterDrawer";
import useFilters from "../../hooks/filters/useFilters";
import TuneIcon from "@mui/icons-material/Tune";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

// Define a constant named ASSETS and assign it the value from a specific environment variable
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const CompanyInfo = ({ company }) => {
  // Destructure properties from the 'company' object
  const {
    webSite,
    facebook,
    twitter,
    instagram,
    urlImage,
    name,
    ceo,
    email,
    phone,
    province,
    address,
    municipality,
  } = company;

  // Check if the company has any social media links
  const hasSocial = webSite || facebook || twitter || instagram;

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
        {/* Display company image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={`${ASSETS}${urlImage}`}
            sx={{
              border: "2px solid",
              borderColor: "primary.main",
              minHeight: "200px",
              minWidth: "200px",
              maxHeight: "400px",
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>

        {/* Display company information */}
        <Grid item xs={12} md={6} sx={{ overflowWrap: "anywhere" }}>
          <Divider sx={{ my: 1, display: { md: "none" } }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Nombre:"
              color="primary"
            />{" "}
            {name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="CEO:"
              color="primary"
            />{" "}
            {ceo}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Correo electrónico:"
              color="primary"
            />{" "}
            {email}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Teléfono:"
              color="primary"
            />{" "}
            {phone}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Provincia:"
              color="primary"
            />{" "}
            {province}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Municipio:"
              color="primary"
            />{" "}
            {municipality}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1.5 }}>
            <Chip
              sx={{ letterSpacing: "0.1rem" }}
              label="Dirección:"
              color="primary"
            />{" "}
            {address}
          </Typography>
          {hasSocial && <Divider sx={{ my: 1, display: { md: "none" } }} />}
        </Grid>
      </Grid>

      {/* Display company social media links */}
      {hasSocial && (
        <CompanySocials
          webSite={webSite}
          facebook={facebook}
          instagram={instagram}
          twitter={twitter}
        />
      )}
    </>
  );
};

const CompanyProducts = ({
  products,
  name,
  filters,
  clearFilters,
  filteredData,
  isLogged,
  isCompany,
}) => {
  // State to control whether the filter drawer is open or not
  const [openFilter, setOpenFilter] = useState(false);

  // Function to open the filter drawer
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  // Function to close the filter drawer
  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  // If no products are available, display a message
  if (products.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <ProductionQuantityLimitsIcon
          sx={{ fontSize: 200, color: "primary.main" }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {name} no tiene productos registrados
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filter drawer */}
      <ProductFilterDrawer
        openFilter={openFilter}
        onCloseFilter={handleCloseFilter}
        onClear={clearFilters}
        filters={filters}
        companyFilters={false}
      />

      {/* Button to open the filter drawer */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        mb={5}
      >
        <Button
          variant="contained"
          startIcon={<TuneIcon />}
          onClick={handleOpenFilter}
        >
          Filtros
        </Button>
      </Stack>

      {/* Display products */}
      {filteredData.length > 0 ? (
        <Grid container spacing={2}>
          {filteredData.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                favorite={
                  isLogged && {
                    isFavorite: product.isFavorite,
                    favoriteType: "product",
                  }
                }
                product={product}
                maintenance={false}
                showCompanyInfo={false}
                to={`${
                  isCompany ? "/company/" : isLogged ? "/client/" : "/"
                }products/product-details/${product.id}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        // If no products match the filters, display a message
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "45vh",
          }}
        >
          <FilterListOffIcon sx={{ fontSize: 200, color: "primary.main" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            No hay productos que cumplan con los filtros
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const CompanyDetails = ({ isCompany }) => {
  // State to manage company data
  const [company, setCompany] = useState([]);

  // Access authentication data from the context
  const { auth } = useAuth();

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Get URL parameter
  const { id } = useParams();

  // Navigation function
  const navigate = useNavigate();

  // Show toast notifications
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Check if user is logged in
  const isLogged = !!auth?.payload;

  // Check if user has the role of "Laboratorio"
  const isLaboratory = isLogged && auth.payload.RoleType === "Laboratorio";

  // Custom hook for managing filters
  const { filters, clearFilters, filteredData, setPriceFilter, setMaxPrice } =
    useFilters(company, true);

  // Fetch company data when the component mounts
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        // Fetch company details by ID
        const res = await getCompanyById(id);
        const productsArr = res.data.products;

        // Find the highest price among products
        const highestPrice = productsArr.reduce((max, product) => {
          return product.price > max ? product.price : max;
        }, 0);

        // Set company data and price filters
        setCompany(res.data);
        setPriceFilter([1, highestPrice]);
        setMaxPrice(highestPrice);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return navigate(-1);

        // Show error notification
        showToastRef.current(
          "Ocurrió un error al obtener la información de la empresa, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id, navigate, setPriceFilter, setMaxPrice]);

  return (
    <Container maxWidth="xl" sx={{ mb: 2, mt: isCompany ? 0 : 3 }}>
      <Button
        startIcon={<KeyboardBackspaceIcon />}
        onClick={() => navigate(-1)}
      >
        Volver
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {company.name}
        </Typography>
      </Box>
      {loading ? (
        // Loading spinner
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
      ) : isLaboratory ? (
        // Display company info for laboratory users
        <CompanyInfo company={company} />
      ) : (
        // Display tabs with different content for non-laboratory users
        <CustomTabs
          tabs={[
            {
              label: "Información",
              content: <CompanyInfo company={company} />,
            },
            {
              label: "Productos",
              content: (
                <CompanyProducts
                  products={company.products}
                  name={company.name}
                  filters={filters}
                  clearFilters={clearFilters}
                  filteredData={filteredData}
                  isLogged={isLogged}
                  isCompany={isCompany}
                />
              ),
            },
          ]}
        />
      )}
    </Container>
  );
};

// Define PropTypes to specify expected props and their types
CompanyDetails.propTypes = {
  isCompany: PropTypes.bool.isRequired,
};

CompanyInfo.propTypes = {
  company: PropTypes.object.isRequired,
};

CompanyProducts.propTypes = {
  products: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired,
  filteredData: PropTypes.array.isRequired,
  isCompany: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

// Exports
export default CompanyDetails;
