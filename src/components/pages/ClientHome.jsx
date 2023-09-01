// Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useToast from "../../hooks/feedback/useToast";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Logo from "../../assets/images/Logo.png";
import CardsCarousel from "../custom/Carousel/CardsCarousel";
import ProductCard from "../custom/Cards/ProductCard";
import CompanyCard from "../custom/Cards/CompanyCard";
import { getClientHome } from "../../services/MediSearchServices/HomeServices";
import useAuth from "../../hooks/persistence/useAuth";

// Retrieves the asset URL from Vite's environment variables
const ASSETS = import.meta.env.VITE_MEDISEARCH;

const ClientHome = () => {
  // Retrieves authentication information using a custom hook
  const { auth } = useAuth();

  // Defines states to hold various data
  const [lastPharmProducts, setLastPharmProducts] = useState([]);
  const [lastFavProducts, setLastFavProducts] = useState([]);
  const [lastFavCompanies, setLastFavCompanies] = useState([]);
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Access the toast function using a custom hook
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Fetches data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Calls the API function to get client home data
        const res = await getClientHome();

        // Updating states with fetched data
        setLastPharmProducts(res.data.lastProducts);
        setLastFavProducts(res.data.favoriteProducts);
        setLastFavCompanies(res.data.favoriteCompanies);
        setNearbyPharmacies(res.data.sameProvinceFarmacies);
      } catch (error) {
        // Handle errors, showing a toast if necessary
        if (error.response?.data?.Error === "ERR_JWT") return;
        showToastRef.current(
          "Ocurrió un error al obtener la información del inicio, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false); // Regardless of success or failure, set loading to false
      }
    };

    fetchData();
  }, []);

  // Defines a loading skeleton component
  const LoadingSkeleton = () => {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  };

  return (
    <Box>
      {/* Profile header section */}
      <Grid
        container
        alignItems="center"
        sx={{
          height: { xs: "max-content", md: 420 },
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
          mt: 0.5,
        }}
      >
        <Grid item xs={12} sm={8} md={6} p={2} sx={{ maxHeight: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* User's profile image */}
            <Box
              component="img"
              sx={{
                height: { xs: 200, sm: 175, md: 190 },
                width: { xs: 200, sm: 175, md: 190 },
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "primary.main",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              alt={auth.payload.sub}
              src={`${ASSETS}${auth.payload.UrlImage}`}
            />

            {/* User's profile information */}
            <Box
              sx={{
                border: "2px solid",
                borderColor: (theme) => theme.palette.primary.light,
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.light, 0.3),
                padding: 2,
                borderRadius: 3,
                width: { xs: "100%", sm: "59%" },
                margin: { xs: ".5rem 0 0 0", sm: "0 0 0 .5rem" },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "0.1rem",
                }}
                noWrap
              >
                {auth.payload.sub}
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {auth.payload.email}
              </Typography>
              <Button
                component={Link}
                to="/client/my-profile"
                variant="outlined"
              >
                ver mi perfil
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Logo section */}
        <Grid item xs={12} sm={4} md={6} sx={{ maxHeight: "100%" }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo de la página"
            sx={{
              maxHeight: 420,
              height: { xs: 200, sm: "auto" },
              maxWidth: "100%",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Welcome message section */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Bienvenido a MediSearch
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            ¡Hola {auth.payload.sub}! Te damos la bienvenida a MediSearch, tu
            plataforma de acceso rápido y seguro a medicamentos y productos
            farmacéuticos. Explora, conecta con farmacias, y lleva tu salud al
            siguiente nivel.
          </Typography>
        </Box>

        {/* Section for displaying recently added pharmaceutical products */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Últimos productos farmacéuticos agregados
          </Typography>
          {loading ? (
            <LoadingSkeleton />
          ) : lastPharmProducts.length > 0 ? (
            <CardsCarousel>
              {lastPharmProducts.map((product) => (
                <ProductCard
                  favorite={false}
                  key={product.id}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={"Farmacia"}
                  to={`/client/products/product-details/${product.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay productos registrados
            </Typography>
          )}
        </Box>

        {/* Section for displaying user's recently marked favorite products */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Tus últimos productos favoritos
          </Typography>
          {loading ? (
            <LoadingSkeleton />
          ) : lastFavProducts.length > 0 ? (
            <CardsCarousel>
              {lastFavProducts.map((product) => (
                <ProductCard
                  favorite={false}
                  key={product.id}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={true}
                  companyType={"Farmacia"}
                  to={`/client/products/product-details/${product.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No has agregado productos a tus favoritos
            </Typography>
          )}
        </Box>

        {/* Section for displaying user's recently marked favorite pharmacies */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Tus últimas farmacias favoritas
          </Typography>
          {loading ? (
            <LoadingSkeleton />
          ) : lastFavCompanies.length > 0 ? (
            <CardsCarousel>
              {lastFavCompanies.map((pharmacy) => (
                <CompanyCard
                  favorite={false}
                  key={pharmacy.id}
                  company={pharmacy}
                  to={`/client/companies/company-details/${pharmacy.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No has agregado farmacias a tus favoritos
            </Typography>
          )}
        </Box>

        {/* Section for displaying pharmacies in the user's province */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Farmacias en tu provincia
          </Typography>
          {loading ? (
            <LoadingSkeleton />
          ) : nearbyPharmacies.length > 0 ? (
            <CardsCarousel>
              {nearbyPharmacies.map((pharmacy) => (
                <CompanyCard
                  favorite={false}
                  key={pharmacy.id}
                  company={pharmacy}
                  to={`/client/companies/company-details/${pharmacy.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay farmacias de tu provincia
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ClientHome;
