// Imports
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getStats } from "../../services/MediSearchServices/AdminServices";
import { useTheme } from "@mui/material/styles";
import useAuth from "../../hooks/persistence/useAuth";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import WidgetSummary from "../custom/Dashboard/WidgetSummary";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CompaniesProvinces from "../custom/Dashboard/CompaniesProvinces";
import ProductsQuantities from "../custom/Dashboard/ProductsQuantities";
import ClassificationsQuantities from "../custom/Dashboard/ClassificationsQuantities";
import PopularProducts from "../custom/Dashboard/PopularProducts";
import FavoriteProductsQuantity from "../custom/Dashboard/FavoriteProductsQuantity";
import useToast from "../../hooks/feedback/useToast";

const Dashboard = () => {
  // Initialize state for holding statistical data and loading status
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the current theme using a custom hook
  const theme = useTheme();

  // Get authentication data from the AuthContext using a custom hook
  const { auth } = useAuth();

  // Extract company-related information from the authentication payload
  const companyType = auth.payload.RoleType;
  const companyName = auth.payload.Company;

  // Get a reference to the toast function from useToast custom hook
  const showToast = useToast();
  const showToastRef = useRef(showToast);

  // Use an effect to fetch statistical data and handle errors
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
        setStats(res.data);
      } catch (error) {
        // Ignored errors
        if (error.response?.data?.Error === "ERR_JWT") return;
        if (error.response.status === 404) return;

        // Shows toast
        showToastRef.current(
          "Ocurrió un error al obtener las estadisticas, informelo al equipo técnico",
          { type: "error" }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mb: 2 }}>
      {/* Title and introductory text */}
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Bienvenido a MediSearch
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 5 }}>
        Manejo de &apos;{companyName}&apos;
      </Typography>

      {/* Grid layout with various data widgets */}
      <Grid container spacing={3} alignItems="center">
        {/* Widget for displaying 'Mis productos' */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/my-products" : ""}
          sx={{ textDecoration: "none" }}
        >
          {/* Display My Products widget if not loading and stats available */}
          {!loading && stats.myProducts !== undefined ? (
            <WidgetSummary
              title="Mis productos"
              total={stats.myProducts}
              Icon={ShoppingCartIcon}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Mis usuarios' */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/users" : ""}
          sx={{ textDecoration: "none" }}
        >
          {/* Display My Users widget if not loading and stats available */}
          {!loading && stats.myUsers ? (
            <WidgetSummary
              title="Mis usuarios"
              total={stats.myUsers - 1}
              color="info"
              Icon={GroupIcon}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Laboratorios' or 'Farmacias' */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={
            !loading
              ? `/company/${companyType === "Farmacia" ? "labs" : "pharmacies"}`
              : ""
          }
          sx={{ textDecoration: "none" }}
        >
          {/* Display Labs or Pharmacies widget if not loading and stats available */}
          {!loading && stats.opposingCompanies !== undefined ? (
            <WidgetSummary
              title={companyType === "Farmacia" ? "Laboratorios" : "Farmacias"}
              total={stats.opposingCompanies}
              color="error"
              Icon={BusinessIcon}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Chats activos' */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          component={Link}
          to={!loading ? "/company/chat" : ""}
          sx={{ textDecoration: "none" }}
        >
          {/* Display Active Chats widget if not loading and stats available */}
          {!loading && stats.myChats !== undefined ? (
            <WidgetSummary
              title="Chats activos"
              total={stats.myChats}
              color="secondary"
              Icon={MarkUnreadChatAltIcon}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={262}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Provincias destacadas' */}
        <Grid item xs={12} md={6} lg={4}>
          {/* Display Provinces with Most Companies widget if not loading and stats available */}
          {!loading && stats.provinceCompanies ? (
            <CompaniesProvinces
              sx={{ boxShadow: 3 }}
              title="Provincias destacadas"
              subheader={`Provincias con más ${
                companyType === "Farmacia" ? "laboratorios" : "farmacias"
              }`}
              chartData={stats.provinceCompanies}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ borderRadius: 2 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Mis productos destacados' */}
        <Grid item xs={12} md={6} lg={8}>
          {/* Display My Top Products widget if not loading and stats available */}
          {!loading && stats.maxProducts ? (
            <ProductsQuantities
              sx={{ boxShadow: 3 }}
              title="Mis productos destacados"
              subheader="Mis productos con mayor cantidad en stock"
              chartData={stats.maxProducts}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={467}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Mis productos populares' */}
        <Grid item xs={12} md={6} lg={8}>
          {/* Display My Popular Products widget if not loading and stats available */}
          {!loading && stats.productFavorites ? (
            <FavoriteProductsQuantity
              sx={{ boxShadow: 3 }}
              title="Mis productos populares"
              subheader="Mis productos con más me gustas"
              chartData={stats.productFavorites}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={350}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Mis productos con mayor interacción' */}
        <Grid item xs={12} md={6} lg={4}>
          {/* Display My Products with Most Interactions widget if not loading and stats available */}
          {!loading && stats.maxInteractions ? (
            <PopularProducts
              sx={{ boxShadow: 3 }}
              title="Mis productos con mayor interacción"
              subheader="Mis productos con más comentarios"
              chartData={stats.maxInteractions}
            />
          ) : (
            // Display a skeleton loading animation
            <Skeleton
              variant="rectangular"
              height={398}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>

        {/* Widget for displaying 'Mis clasificaciones destacadas' */}
        <Grid item xs={12}>
          {/* Display My Top Classifications widget if not loading and stats available */}
          {!loading && stats.maxClassifications ? (
            <ClassificationsQuantities
              sx={{ boxShadow: 3 }}
              title="Mis clasificaciones destacadas"
              subheader="Mis clasificaciones con más productos"
              chartData={stats.maxClassifications}
            />
          ) : (
            // Display a skeleton loading
            <Skeleton
              variant="rectangular"
              height={453}
              sx={{ borderRadius: 3 }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
