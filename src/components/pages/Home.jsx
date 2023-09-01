// Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useToast from "../../hooks/feedback/useToast";
import { alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Logo from "../../assets/images/Logo.png";
import Lab from "../../assets/images/laboratorio.png";
import Pharm from "../../assets/images/farmacia.png";
import Client from "../../assets/images/cliente.png";
import CardsCarousel from "../custom/Carousel/CardsCarousel";
import ProductCard from "../custom/Cards/ProductCard";
import CompanyCard from "../custom/Cards/CompanyCard";
import { getHome } from "../../services/MediSearchServices/HomeServices";

const Home = () => {
  // Initialize state variables using the useState hook
  const [pharmacies, setPharmacies] = useState([]);
  const [laboratories, setLaboratories] = useState([]);
  const [pharmProducts, setPharmProducts] = useState([]);
  const [labProducts, setLabProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from an API using the getHome function
        const res = await getHome();

        // Update state variables with fetched data
        setPharmacies(res.data.lastFarmacies);
        setLaboratories(res.data.lastLaboratories);
        setPharmProducts(res.data.lastProductsFarmacies);
        setLabProducts(res.data.lastProductsLaboratories);
      } catch (error) {
        // If an error occurs during data fetching, display an error toast
        showToastRef.current(
          "Ocurrió un error al obtener la información del inicio, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        // Regardless of success or failure, mark data loading as complete
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Styling object for a role widget
  const roleWidgetSx = {
    margin: "0 auto",
    width: "fit-content",
    height: 240,
    backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
    borderRadius: "50%",
    p: 5,
  };

  // Component for rendering a loading skeleton
  const LoadingSkeleton = () => {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  };

  return (
    <Box>
      {/* Home header */}
      <Grid
        container
        sx={{
          height: { xs: "max-content", md: 420 },
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
          mt: 0.5,
        }}
        alignItems="center"
      >
        {/* Home header text content */}
        <Grid item xs={12} sm={8} md={6} p={2} sx={{ maxHeight: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 2,
                letterSpacing: "0.2rem",
                textAlign: "center",
              }}
            >
              MediSearch
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
              MediSearch es una plataforma en línea que proporciona a sus
              usuarios una mayor accesibilidad a medicamentos y productos
              farmacéuticos al conectar a clientes, farmacias y laboratorios de
              manera eficiente y conveniente.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button component={Link} to="/login" variant="contained">
                inicia
              </Button>
              <Button component={Link} to="/signup" variant="outlined">
                registrate y descubre
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Home header icon */}
        <Grid item xs={12} sm={4} md={6} sx={{ maxHeight: "100%" }}>
          <Box
            component="img"
            src={Logo}
            alt="Logo de la página"
            sx={{
              maxHeight: 420,
              maxWidth: "100%",
              height: { xs: 200, sm: "auto" },
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Section: Introduction */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Conecta, cuida y avanza.
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Con MediSearch, encuentra una nueva forma de acceder a la salud: 20%
            búsqueda, 80% resultados.
          </Typography>
        </Box>

        {/* Section: User Roles */}
        <Box
          component="section"
          sx={{
            mb: 4,
            display: { xs: "block", md: "flex" },
            justifyContent: "space-evenly",
          }}
        >
          {/* User Role: Cliente */}
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Box sx={roleWidgetSx}>
              <Box
                component="img"
                src={Client}
                alt="Cliente"
                sx={{
                  maxHeight: "100%",
                }}
              />
            </Box>
            <Typography variant="h6">Experiencia como cliente</Typography>
            <Typography variant="boby">
              Explora y adquiere medicamentos fácilmente, comunica tus
              necesidades y mejora tu bienestar con MediSearch.
            </Typography>
          </Box>

          {/* User Role: Farmacia */}
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Box sx={roleWidgetSx}>
              <Box
                component="img"
                src={Pharm}
                alt="Farmacia"
                sx={{
                  maxHeight: "100%",
                }}
              />
            </Box>
            <Typography variant="h6">Experiencia como farmacia</Typography>
            <Typography variant="boby">
              Promociona tus productos, interactúa con clientes y laboratorios,
              optimiza operaciones y ofrece atención farmacéutica excepcional.
            </Typography>
          </Box>

          {/* User Role: Laboratorio */}
          <Box sx={{ textAlign: "center", margin: 1 }}>
            <Box sx={roleWidgetSx}>
              <Box
                component="img"
                src={Lab}
                alt="Laboratorio"
                sx={{
                  maxHeight: "100%",
                }}
              />
            </Box>
            <Typography variant="h6">Experiencia como laboratorio</Typography>
            <Typography variant="boby">
              Presenta tus innovaciones, conecta con farmacias, ofrece provisión
              de medicamentos y colabora en la salud global.
            </Typography>
          </Box>
        </Box>

        {/* Section: Latest Registered Pharmacies */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Últimas farmacias registradas en nuestra plataforma
          </Typography>
          {/* Display loading or pharmacies */}
          {loading ? (
            <LoadingSkeleton />
          ) : pharmacies.length > 0 ? (
            <CardsCarousel>
              {pharmacies.map((pharmacy) => (
                <CompanyCard
                  favorite={false}
                  key={pharmacy.id}
                  company={pharmacy}
                  to={`/companies/company-details/${pharmacy.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            // No data render
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay farmacias registradas
            </Typography>
          )}
        </Box>

        {/* Section: Latest Registered Laboratories */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Últimos laboratorios registrados en nuestra plataforma
          </Typography>
          {/* Display loading or laboratories */}
          {loading ? (
            <LoadingSkeleton />
          ) : laboratories.length > 0 ? (
            <CardsCarousel>
              {laboratories.map((lab) => (
                <CompanyCard
                  key={lab.id}
                  favorite={false}
                  company={lab}
                  to={`/companies/company-details/${lab.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            // No data render
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay laboratorios registrados
            </Typography>
          )}
        </Box>

        {/* Section: Latest Added Products */}
        <Box component="section" sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: 700, mb: 2 }}
          >
            Últimos productos agregados en nuestra plataforma
          </Typography>
          {/* Display loading or lab and pharmacy products */}
          {loading ? (
            <LoadingSkeleton />
          ) : labProducts.length > 0 || pharmProducts.length > 0 ? (
            <CardsCarousel>
              {labProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  favorite={false}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={false}
                  to={`/products/product-details/${product.id}`}
                />
              ))}
              {pharmProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  favorite={false}
                  product={product}
                  maintenance={false}
                  showCompanyInfo={false}
                  to={`/products/product-details/${product.id}`}
                />
              ))}
            </CardsCarousel>
          ) : (
            // No data render
            <Typography
              variant="h4"
              color="GrayText"
              sx={{ textAlign: "center" }}
            >
              No hay productos registrados
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
